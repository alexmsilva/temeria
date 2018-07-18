const Temeria = artifacts.require("Temeria");

contract("Temeria", accounts => {
    let temeria;
    const [firstAccount, secondAccount, thirdAccount, fourthAccount] = accounts;

    beforeEach(async () => {
        temeria = await Temeria.new({value: 1000});
    });

    it("tests initial status", async () => {
        assert.equal(await temeria.king(), firstAccount);
        assert.equal(await temeria.getKingValue(), 1000)
        assert.equal(await temeria.duke(), 0x0);
        assert.equal(await temeria.marquis(), 0x0);
        assert.equal(await temeria.earl(), 0x0);
        assert.equal(await temeria.viscount(), 0x0);
        assert.equal(await temeria.baron(), 0x0);
    });

    it("sets a new account as a king", async () => {
        let amount = 1005;
        await temeria.beTheKing({from: secondAccount, value: amount});
        assert.equal(await temeria.king(), secondAccount);
        assert.equal(await temeria.getKingValue(), amount);
        assert.equal(await temeria.duke(), firstAccount);
    });

    it("does not allow lower amout of ether to be the King", async () => {
        try {
            await temeria.beTheKing({from: thirdAccount, value: 100});
            assert.fail();
        } catch (error) {
            assert.ok(/revert/.test(error.message));
        }
    });

    it("sets an Earl as a King", async () => {
        await temeria.beTheKing({from: secondAccount, value: 1005});
        await temeria.beTheKing({from: thirdAccount, value: 1006});
        await temeria.beTheKing({from: fourthAccount, value: 1007});
        assert.equal(await temeria.king(), fourthAccount);
        assert.equal(await temeria.duke(), thirdAccount);
        assert.equal(await temeria.marquis(), secondAccount);
        assert.equal(await temeria.earl(), firstAccount);

        await temeria.beTheKing({from: firstAccount, value: 1008});
        assert.equal(await temeria.king(), firstAccount);
        assert.equal(await temeria.duke(), fourthAccount);
        assert.equal(await temeria.marquis(), thirdAccount);
        assert.equal(await temeria.earl(), secondAccount);
    });

    it("should reward other accounts after a new King", async () => {
        let budget = await temeria.getKingValue();
        let firstAccountBalance = await web3.eth.getBalance(firstAccount); // returns a bigNumber
        await temeria.beTheKing({from: secondAccount, value: web3.toWei(1, "ether")});
        let expectedBalance = firstAccountBalance.toNumber() + (budget/2);
        let currentBalance = await web3.eth.getBalance(firstAccount);
        assert.equal(expectedBalance, currentBalance.toNumber());
    });
});

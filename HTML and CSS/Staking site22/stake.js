// var web3;
// async function connect(){
//     await window.web3.currentProvider.enable();
//     web=new Web3(window.web3.currentProvider);
//     document.getElementById('Metamask').value=web;
// }


const goldstake = [];
const userunstake = [];
var amountStake = 200
var reward = 20;
var timereward = 0.5;
var owner = "amirali";

function Stake(stklevel, reward) {
    let amount = amountStake;
    stklevel.push(amount);
    let days = new Date();

    document.getElementById('stakeorders').innerHTML += `        
    <div class="statedtoken">
    <h3>Amount:</h3>
    <h4>${amount}</h4>
    <h3>Start:</h3>
    <h4>${days}</h4>
    <h3>Capital+Reward:</h3>
    <h4>${amount}+${reward}</h4>
    </div>`
}
function unstake() {
    let number = document.getElementById('numberstake').value;
    let finalamount = goldstake[number - 1]
    userunstake.push(finalamount);
    delete goldstake[number - 1];
    document.getElementById('stakeorders').innerHTML += `
    <div class="statedtoken" style="background-color: #12766d;">
    <h3>Amount:</h3>
    <h4>${finalamount}</h4>
    </div>`
}

function withdraw() {
    let userid = document.getElementById('userid').value;
    let amount = document.getElementById('amountwidraw').value;
    if (goldstake[userid - 1] >= amount) {
        goldstake[userid - 1] += goldstake[userid - 1] * reward / 100;
        goldstake[userid - 1] -= amount;
        document.getElementById('stakeorders').innerHTML += `
            <div class="statedtoken" style="background-color:#12766d;">
            <h3>amount withdrawn:</h3>
            <h4>${amount}</h4>
            <h3>remaining amount:</h3>
            <h4>${goldstake[userid - 1]}</h4>
        </div>`
    }
    else {
        document.getElementById('stakeorders').innerHTML += `
        <div class="statedtoken" style="background-color:red;">
        <h3>You do not have enough money to withdraw</h3>
    </div>`
    }


}

function Reward(number) {
    return stakeamount[number - 1] * (Rewardcount * reward) / 100;
}

function claimreward(number) {
    return stakeamount[number - 1] * (Rewardcount * reward) / 100;
}

const userbalance = (number) => {
    return stakeamount[number - 1]
}




function checktmreward(usertimereward) {
    let time = usertimereward;
    let timest = new Date();
    let rewardcount = (timest.getDay - time) / timereward;
    return rewardcount;
}



function totalsuply() {
    let result = document.getElementById('tlstake');
    let totalamount = 0;
    for (let i = 0; i < goldstake.length; i++) {
        totalamount += goldstake[i];
    }
    result.innerHTML = `${totalamount} WWS`;
}

//..................................................owner seting.............................
function setseting() {
    var result = document.getElementById('result');
    // let amountstake = document.getElementById('amtstk').value;
    // let Timereward = document.getElementById('tmrw').value;
    // let rewardamount = document.getElementById('amtrw').value;

    // reward = rewardamount;
    // timereward = Timereward;
    // amountStake = amountstake;
    result.innerHTML = "Settings saved successfully"
    result.style.color = "green"
    // document.getElementById('tmreward').value=time+" daye"
    // document.getElementById('reward').value=reward+"% APY"
    // document.getElementById('stakeamt').value=amountStake;

    // catch(err){
    //     result.innerHTML="you have an error"+err
    //     result.style.color="red";
    // }

}


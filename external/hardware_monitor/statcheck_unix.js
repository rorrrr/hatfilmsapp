const si = require('systeminformation');
var fs = require('fs');
var handParser = require("poker-parser").handParser;
// var extractHands = require('hhp')
// var getLines = require('hhp')
// var parse = require('hhp')
// var analyze = require('hha')
// const hhv = require('hhv')
// const hhp = require('hhp')
// const hha = require('hha')
// var update = require('hhv')


// var recentFile = fs.readdirSync('../HHstore').slice(-1)[0];
// var fileContent = fs.readFileSync('../HHstore/'+recentFile)


const getStats = ()=> {
  selectedHand = fs.readFileSync('../HHstore/'+fs.readdirSync('../HHstore')[1]).toString().split('\n\n')
  return new Promise((resolve, reject) => {
    Promise.all([si.currentLoad(), si.mem()])
    .then((data) => {
      resolve({
        CPU: data[0].currentload,
        RAM: data[1].active / data[1].total * 100,
        HH: handParser(selectedHand.slice(-1)[0]).ownHand + "\t" + handParser(selectedHand.slice(-1)[0]).pot 

        + "\n\n" +  handParser(selectedHand.slice(-2)[0]).ownHand + "\t" + handParser(selectedHand.slice(-2)[0]).pot

        + "\n\n" + handParser(selectedHand.slice(-3)[0]).ownHand + "\t" + handParser(selectedHand.slice(-3)[0]).pot

        + "\n\n" + handParser(selectedHand.slice(-4)[0]).ownHand + "\t" + handParser(selectedHand.slice(-4)[0]).pot

      });
    })
    .catch((err) => {
      reject(err);
    });
  });
};

module.exports = {
  getStats: getStats
};



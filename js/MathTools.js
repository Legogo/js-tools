MathTools = function(){}

MathTools.addMissingZeros = function(val){if(val < 10) return "0"+val;return val;}
MathTools.sign = function(x){if(x < 0) return -1;else if(x > 0)  return 1;return 0;}
MathTools.roundTo = function(val, decimal){val = Math.floor(val * decimal);val = val / decimal;return val;}
MathTools.lerp = function(a,b,amount){ return a + amount * (b-a); }
MathTools.inverselerp = function(a,b,amount){ return (amount - a) / (b-a); }

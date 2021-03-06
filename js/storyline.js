
function updateBasedOnProgress(){
	switch(discoverProgress){
		case -2:
			if(mathematica.highestMathematica.gte(2)){
				document.getElementById("story1").style.opacity = 1;
				document.getElementById("story1").style.zIndex = 1;
				discoverProgress++;
			}
			break;
		case -1:
			if(mathematica.highestMathematica.gte(4)){
				document.getElementById("story3").style.opacity = 1;
				document.getElementById("story3").style.zIndex = 1;
				discoverProgress++;
			}
			break;
		case 0:
			if(mathematica.highestMathematica.gte(6)){
				document.getElementById("story4").style.opacity = 1;
				document.getElementById("story4").style.zIndex = 1;
				document.getElementById("story3").style.opacity = 0;
				document.getElementById("story3").style.zIndex = -1;
				discoverProgress++;
			}
			break;z
		case 1:
			if(parents.highestRealDollars.gte(10)){
				document.getElementById("childrenContainer").style.opacity = 1;
				document.getElementById("childrenContainer").style.zIndex = 1;

				discoverProgress++;
			}
			break;
		case 2:
			if(iq.highestPoints.gte(5)){
				document.getElementById("u1x").style.opacity = 1;
				document.getElementById("u1x").style.zIndex = 1;

				discoverProgress++;
			}
			break;
		case 3:
			if(iq.highestiqps.gte(4.5)){ 
				document.getElementById("u1Alg").style.opacity = 1;
				document.getElementById("u1Alg").style.zIndex = 1;
				document.getElementById("u1Alg").innerHTML = "MPS * 1.2 <br />Cost:<span id=u1Algc>10.0</span>IQ Points";
				discoverProgress++;
			}
			break;
		case 4:
			if(iq.highestiqps.gte(6)){ 
				document.getElementById("lobbyreveal").style.opacity = 1;
				document.getElementById("lobbyreveal").style.zIndex = 1;
				discoverProgress++;
			}
			break;
		case 5:
			if(iq.highestPoints.gte(60)){
				document.getElementById("u2Alg").style.opacity = "1";
				document.getElementById("u2Alg").style.zIndex = "1";
				if(iq.highestiqps.gte(37.5)){
					lobbying.openable = true;
					var lob = document.getElementById("lobbyreveal");
					lob.innerHTML = "Lobby the government.";
					lob.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--good'); 
					lob.style.boxShadow = "none";
					discoverProgress++;
				}
			}
			break;
		case 6:
			if(iq.highestPoints.gte(100)){
				document.getElementById("u2Alg").innerHTML = "IQ Point Cost / 1.2 <br />Cost:<span id=u2Algc>100</span>IQ Points";
				document.getElementById("story20").style.opacity = 1;
				document.getElementById("story20").style.zIndex = 1;
				discoverProgress++;
			}
			break;
		case 7:
			if(child.two.purchased){
				document.getElementById("sacrifice").style.opacity = 1;
				document.getElementById("sacrifice").style.zIndex = 1;
				discoverProgress++;
			}
			break;
		case 8:
			if(iq.highestiqps.gte(43.5)){
				document.getElementById("sacrifice").innerHTML = "Sacrifice the children. <br /> <span id=lobbyinggain>0</span> Lobbying Dollars Earned";
				lobbying.purchasable = true;
				lobbying.updateTotals();
				discoverProgress++;
			}
			break;
		/*case 1:
			if(highestMathematica.gte(20)){
				document.getElementById("u2Alg").style.opacity = "1";
				document.getElementById("u2Alg").style.zIndex = "1";
				discoverProgress++;
			}
		break;
		case 2:
			if(highestMathematica.gte(100)){
				document.getElementById("u2Alg").innerHTML = "Cost / 1.2 <br />Cost: <span id=u2Algc>10</span>";
				discoverProgress++;
			}
		break;
		case 3:
			if(highestMathematica.gte(500)){
				document.getElementById("auto1").style.opacity = "1";
				document.getElementById("auto1").style.zIndex = "1";
				discoverProgress++;
			}
		break;
		case 4:
			if(highestMathematica.gte(1000)){
				document.getElementById("auto1").innerHTML = "x increment autobuyer <br />Cost: <span id=auto1c>1000</span>";
				discoverProgress++;
			}
		break;*/ //this needs to be IQ not mathematica.
	}
}

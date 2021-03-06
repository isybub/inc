



var ChildUpgradeable = function(startCost, currentCost, startProd, currentProd, upgradeCount, childNum, childNumAsString){

	this.startCost = new Decimal(startCost);

	this.currentCost = new Decimal(currentCost);

	this.startProd = new Decimal(startProd);

	this.currentProd = new Decimal(currentProd);

	this.upgradeCount = new Decimal(upgradeCount);

	this.childNum = childNum;

	this.childNumAsString = childNumAsString;

	this.timeToExam = 5;

	this.currentYear = 1;

	this.progressBar = 0; 

	this.termspeed = 6;

	this.progressbarsStartTime = 0;

	this.completedExams = 0;

	this.purchased = false;


	this.upgrade = function (){
		if(this.iCanBuy(this.currentCost)&&!this.progressBar){

			parents.realDollars = parents.realDollars.subtract(this.currentCost);
			this.upgradeCount = this.upgradeCount.add(1);


			this.progressbarsStartTime = Date.now();
			this.progressBar = 0.01;
			this.update();

		}

	};

	this.reset = function(){
		if(this.purchased){
			this.upgradeCount = new Decimal(1);
			this.currentCost = new Decimal(0);
			this.completedExams = 0;
			this.progressBar = 0;
			this.timeToExam = 6;
			this.currentYear = 0;
			this.finalize();
		}
	}


	this.update = function(){

		if(this.progressBar){

			this.progressBar = 0.01+(Date.now() - this.progressbarsStartTime)/(1000 * (this.termspeed));

			var bar = document.getElementById("child"+this.childNum+"buy");
			bar.style.boxShadow = "inset "+225*this.progressBar+"px 0 0 0 var(--background)";

			if(this.progressBar>=1){

				this.finalize();

			}

		}

	}


	this.finalize = function(){

		this.howMuchLongerUntilExam()

		this.progressBar = 0;
		this.currentProd = upgradeChildProduction(this.startProd,this.upgradeCount,this.completedExams);
		var examCostPredictor = this.completedExams;
		if(this.timeToExam==1) examCostPredictor++;
		this.currentCost = upgradeChildCost(this.startCost,this.upgradeCount,examCostPredictor);

		this.displayExamOrTerm();
		iq.updateTotal();
		this.visuallyUpdateChild();

		lobbying.updateTotals(lobbying);

	}


	this.howMuchLongerUntilExam = function(){
		
		this.timeToExam--;
		if(this.timeToExam == 0){
			this.timeToExam = 5;
			this.completedExams++;
		}

	}


	this.displayExamOrTerm = function(){

		var num = this.childNum;
		var upgrade = "child"+(num)+"up";

		if(this.timeToExam==1){

			document.getElementById(upgrade).innerHTML = "<a id=child"+num+"buy href=\"javascript:child."+childNumAsString+".upgrade()\"><span id=centertext>End of year exam <br />$<span id=\"child"+num+"cost\">1</span> Real Dollars</span></a>";

		}else if(this.timeToExam==5){

			this.currentYear++;

			document.getElementById(upgrade).innerHTML = "<a id=child"+num+"buy href=\"javascript:child."+childNumAsString+".upgrade()\"><span id=centertext>Complete a term <br />$<span id=\"child"+num+"cost\">1</span> Real Dollars</span></a>";

			var year = "child"+num+"year";
			if(this.currentYear==1){
				document.getElementById(year).innerHTML = "1st Year";
			}else if(this.currentYear==2){
				document.getElementById(year).innerHTML = "2nd Year";
			}else if(this.currentYear==3){
				document.getElementById(year).innerHTML = "3rd Year";				
			}else{
				document.getElementById(year).innerHTML = this.currentYear+"th Year";
			}

		}

	}


	this.visuallyUpdateChild = function(){

		document.getElementById("child"+this.childNum+"IQ").innerHTML = this.currentProd.toPrecision(3)+" IQ";
		document.getElementById("child"+this.childNum+"cost").innerHTML = this.currentCost.toPrecision(3);
		document.getElementById("iqps").innerHTML = iq.ps.toPrecision(3);

	}



	this.newChild = function(){
		if(parents.realDollars.gte(this.currentCost)){
			parents.realDollars = parents.realDollars.subtract(this.currentCost);
			var num = this.childNum;
			var tr = "child"+num;
			var name = "child"+num+"name";
			var IQ = "child"+num+"IQ";
			var upgrade = "child"+num+"up";
			var year = "child"+num+"year";
			document.getElementById(tr).style.opacity = 1;
			document.getElementById(tr).style.zIndex = 1;

			document.getElementById(name).innerHTML = "Random";
			document.getElementById(IQ).innerHTML = "0 IQ";
			document.getElementById(upgrade).innerHTML = "<a id=child"+num+"buy href=\"javascript:child."+childNumAsString+".upgrade()\"><span id=centertext>Complete a term <br />$<span id=\"child"+num+"cost\">10.0</span> Real Dollars</span></a>";
			document.getElementById(year).innerHTML = "1st Year";

			this.purchased = true;

			if(++num<5){
				tr = "child"+num;
				document.getElementById(tr).style.opacity = 1;
				document.getElementById(tr).style.zIndex = 1;
				Object.keys(child).forEach(function(c){
					if(child[c].childNum==num){
						child[c].visuallyUpdateChild();
					}
				});
			}
			this.visuallyUpdateChild();
		}
		

	}

	this.iCanBuy = function(num){
		return parents.realDollars.gte(num);
	}




}

var Child1 = new ChildUpgradeable(new Decimal(5),new Decimal(5),new Decimal(0.5),new Decimal(0),1,1,"one");

var Child2 = new ChildUpgradeable(new Decimal(50),new Decimal(50),new Decimal(5),new Decimal(0),1,2,"two");

var Child3 = new ChildUpgradeable(new Decimal(500),new Decimal(500),new Decimal(50),new Decimal(0),1,3,"three");

var Child4 = new ChildUpgradeable(new Decimal(5000),new Decimal(5000),new Decimal(500),new Decimal(0),1,4,"four");

function upgradeChildCost(startCost,upgradeCount,completedExams){
	
	return startCost.multiply(upgradeCount.minus(1)).multiply(completedExams * 4).add(startCost.multiply(upgradeCount));

}
function upgradeChildProduction(startProd,upgradeCount,completedExams){
	
	return startProd.plus(1).multiply(upgradeCount.minus(1)).multiply(examLobbyingUpgradeable.current.multiply(completedExams * 4)).add(startProd.plus(1).multiply(upgradeCount.minus(1)));

}


var child = new function(){

	this.one = Child1;

	this.two = Child2;

	this.three = Child3;

	this.four = Child4;

}

var iq = new function(){
	
	this.points = new Decimal(0);

	this.ps = new Decimal(0);

	this.highestPoints = new Decimal(0);

	this.highestiqps = new Decimal(0);

	this.updateTotal = function(){

		var total = new Decimal(0);
		Object.keys(child).forEach(function(c){
			total = total.add(child[c].currentProd);
		});
		this.ps = total;

	}

	this.update = function(){

		this.points = this.points.add(this.ps.div(tickSpeed).multiply(tickRate));

		if(this.points.gte(this.highestPoints)) this.highestPoints = this.points;
		if(this.ps.gte(this.highestiqps)) this.highestiqps = this.ps;

	}
}
class Drink {
}

class Water {
	constructor() {
		this.name = "water";
		this.price = 100;
	}
}
class Juice {
	constructor() {
		this.name = "juice";
		this.price = 130;
	}
}
class Coke {
	constructor() {
		this.name = "coke";
		this.price = 150;
	}
}

class BendingMachine {
	constructor() {
		this.stock = {
			water: [],
			juice: [],
			coke: []
		};
		this.change = 0;
	}
	fill(name, obj) {
		if(this.stock[name] === undefined)return false;
		this.stock[name].push(obj);
	}
	sell(name, number, paied) {
		if(this.stock[name] === undefined)return false;
		if(!this.stock[name].length) {
			alert("在庫切れです\nごめんね");
			return this.change = paied;
		}
		if(this.stock[name].length < number) {
			alert(this.stock[name].length + "個しかなかったよ…");
			number = this.stock[name].length;
		}
		const supply = [];
		for(let i = 0; i < number; i++) {
			supply.push(this.stock[name].shift());
		}
		let sum = 0;
		supply.forEach(function(v, i) {
			sum += v.price;
		});
		this.change = paied - sum;
		if(this.change < 0) {
			alert("お金が足りないよ");
			supply.forEach((v, i) => {
				this.stock[name].unshift(v);
				supply.shift();
			});
			return this.change + sum;
		}
		alert("ガコン\n" + supply.map(function(v) { return v.name }));
		return this.change;
	}
}

const drink = document.getElementById("drink");
const number = document.getElementById("number");
const money = document.getElementById("money");

const bm = new BendingMachine();
for(let i = 0; i < 10; i++) {
	bm.fill("water", new Water());
}
for(let i = 0; i < 10; i++) {
	bm.fill("juice", new Juice());
}
for(let i = 0; i < 10; i++) {
	bm.fill("coke", new Coke());
}

let change;
function sell() {
	change = bm.sell(drink.value, number.value, money.value);
	if(change === false) {
		alert("そんな飲み物はないよ");
		change = money.value;
		return;
	}
	money.value = change;
}

function returnChange() {
	// if(change === undefined)change = money.value;
	change = money.value;
	alert(change);
	money.value = 0;
	change = undefined;
}

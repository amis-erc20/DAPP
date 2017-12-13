var this$ = this;
this.SiteQ = function(it){
	return /^[\S]+\.[\S]+$/gi.test(it);
};

this.IntQ = function(it){
	return /^[0-9\.]+$/gi.test(it);
};

this.EthQ = function(it){
	return /^(0x)?[0-9a-zA-Z]{42}$/i.test(it);
};

this.ShaQ = function(it){
	return /^(0x)?[0-9a-zA-Z]{66}$/i.test(it);
};

this.EmailQ = function(it){
	return /^[\S]+\@[\S]+\.[\S]+$/gi.test(it);
};

this.dateNowArr = function(){
	return slice(1, 4)(
		split(' ')(
			String(
				new Date(Date.now()))));
};

this.dateTomorrowArr = function(){
	return incDateArr({
		date: Date.now(),
		inc: 1
	});
};

this.incDateArr = function(it){
	var date;
	date = new Date(Date.parse(it.date));
	return slice(1, 4)(
		split(' ')(
			String(
				new Date(date.setDate(date.getDate() + (+it.inc - 1))))));
};

this.formatDate = function(it){
	return ((it != null ? it[1] : void 8) || '') + " " + ((it != null ? it[0] : void 8) || '') + " " + drop(2, (it != null ? it[2] : void 8) || '');
};

this.today = function(){
	return formatDate(dateNowArr());
};

this.tomorrow = function(){
	return formatDate(dateTomorrowArr());
};

this.incDate = function(it){
	return formatDate(incDateArr(it));
};

this.getAllOf = function(it){
	var rules_arr, rules, n, rule;
	rules_arr = [];
	rules = state.get(it);
	for (n in rules) {
		rule = rules[n];
		rule.id = n;
		rules_arr.push(rule);
	}
	return rules_arr;
};

this.getNumOf = function(it){
	var arr, els, n;
	arr = [];
	els = state.get(it);
	for (n in els) {
		arr.push(n);
	}
	return arr;
};

this.deleteYear = function(it){
	return slice(0, 6, it);
};

this.getId = function(){
	var id, charset, i$, ref$, len$, i, pos;
	id = '';
	charset = union([48, 49, 50, 51, 52, 53, 54, 55, 56, 57], [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90], [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122]);
	for (i$ = 0, len$ = (ref$ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]).length; i$ < len$; ++i$) {
		i = ref$[i$];
		pos = Math.floor(62 * Math.random());
		id += String.fromCharCode(charset[pos]);
	}
	return String(id);
};

this.pushToState = function(){
	var current;
	current = state.get(arguments[0]);
	current.push(arguments[1]);
	return state.set(arguments[0], current);
};

this.lookupAndAppend = function(obj, cls){
	return Meteor.setTimeout(function(){
		if (typeof obj !== 'undefined') {
			return $(cls).html(String(obj));
		} else {
			return lookupAndAppend(obj, cls);
		}
	}, 30);
};

this.lookup = function(obj, func){
	return Meteor.setTimeout(function(){
		if (typeof obj !== 'undefined') {
			return func(obj);
		} else {
			state.set('inc_lookup', (state.get('inc_lookup') || 1) + 1);
			console.log(state.get('inc_lookup'));
			if (state.get('inc_lookup') > 20) {
				return;
			}
			return lookup(obj, func);
		}
	}, 30);
};

this.conscb = function(){
	if (arguments[0]) {
		console.log('err:', arguments[0]);
	}
	if (arguments[1]) {
		return console.log('res:', arguments[1]);
	}
};

this.gotoSuccessCb = function(){
	if (arguments[0]) {
		console.log('err:', arguments[0]);
	}
	if (arguments[1]) {
		console.log('res:', arguments[1]);
		return Router.go('success');
	}
};

this.simpleCb = function(){
	if (arguments[0]) {
		new Error(arguments[0]);
	}
	if (arguments[1]) {
		return arguments[1];
	}
};

this.stateIntToStr = function(state, what){
	switch (state) {
		case 0:
			return 'no data';
		case 1:
			return 'waiting for ' + what;
		case 2:
			return 'cancelled';
		case 3:
			return 'waiting for lender';
		case 4:
			return 'funded';
		case 5:
			return 'default';
		case 6:
			return 'finished';
		default:
			return '----';
	}
};

this.bigZero = '0x0000000000000000000000000000000000000000';
this.shaZero = '0x0000000000000000000000000000000000000000000000000000000000000000';
this.getItTail = function(it){
	return tail(
		chars(
			join('')(
				it)));
};

this.getItHead = function(it){
	return first(
		chars(
			join('')(
				it)));
};

this.getNum = function(it){
	return join('')(
		[getItHead(it)].concat(['.'], getItTail(it)));
};

this.ethToWei = function(str){
	var bn;
	bn = new BigNumber(str);
	return bn.times(1000000000000000000).toFixed();
};

this.bigNumAdd = function(arr1, arr2){
	var a1, a2;
	a1 = new BigNumber(0);
	a2 = new BigNumber(0);
	a1.c = arr1 != null ? arr1.c : void 8;
	a1.e = arr1 != null ? arr1.e : void 8;
	a1.s = arr1 != null ? arr1.s : void 8;
	a2.c = arr2 != null ? arr2.c : void 8;
	a2.e = arr2 != null ? arr2.e : void 8;
	a2.s = arr2 != null ? arr2.s : void 8;
	return bigNumToStr(a1.add(a2));
};

this.bigNumAddWei = function(arr1, arr2){
	var a1, a2;
	a1 = new BigNumber(0);
	a2 = new BigNumber(0);
	a1.c = arr1 != null ? arr1.c : void 8;
	a1.e = arr1 != null ? arr1.e : void 8;
	a1.s = arr1 != null ? arr1.s : void 8;
	a2.c = arr2 != null ? arr2.c : void 8;
	a2.e = arr2 != null ? arr2.e : void 8;
	a2.s = arr2 != null ? arr2.s : void 8;
	return a1.add(a2).toFixed();
};

this.bigNumToStr = function(arr){
	var bn, many;
	bn = new BigNumber(0);
	bn.c = arr != null ? arr.c : void 8;
	bn.e = arr != null ? arr.e : void 8;
	bn.s = arr != null ? arr.s : void 8;
	many = 1000000000000000000;
	return bn.dividedBy(many).toFixed();
};

this.bigNumToStrDiv10 = function(arr){
	var bn, many;
	bn = new BigNumber(0);
	bn.c = arr != null ? arr.c : void 8;
	bn.e = arr != null ? arr.e : void 8;
	bn.s = arr != null ? arr.s : void 8;
	many = '10000000000000000000';
	return bn.dividedBy(many).toFixed();
};

this.lilNumToStr = function(arr){
	var bn;
	bn = new BigNumber(0);
	bn.c = arr != null ? arr.c : void 8;
	bn.e = arr != null ? arr.e : void 8;
	bn.s = arr != null ? arr.s : void 8;
	return bn.toFixed();
};

this.stateNull = function(it){
	return state.set(it, null);
};

this.shortest = function(str1, str2){
	if (str1.length > str2.length) {
		return str2;
	} else {
		return str1;
	}
};

this.yesno = function(it){
	if (it) {
		return 'Yes';
	} else {
		return 'No';
	}
};

this.getFaqImgLink = function(it){
	switch (it) {
		case 1:
			return a({
				href: 'http://ibb.co/mDACyF'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/ePDAkv/image1.jpg',
				alt: 'image1',
				border: '0'
			}));
		case 2:
			return a({
				href: 'http://ibb.co/eRmkJF'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/dtACyF/image2.jpg',
				alt: 'image2',
				border: '0'
			}));
		case 3:
			return a({
				href: 'http://ibb.co/c0wkJF'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/krbVkv/image3.jpg',
				alt: 'image3',
				border: '0'
			}));
		case 4:
			return a({
				href: 'http://ibb.co/h2dbQv'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/iB4GQv/image4.jpg',
				alt: 'image4',
				border: '0'
			}));
		case 5:
			return a({
				href: 'http://ibb.co/iwUGQv'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/noyAkv/image5.jpg',
				alt: 'image5',
				border: '0'
			}));
		case 6:
			return a({
				href: 'http://ibb.co/npjSXa'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/iLPSXa/image6.jpg',
				alt: 'image6',
				border: '0'
			}));
		case 7:
			return a({
				href: 'http://ibb.co/cJWVkv'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/k1UGQv/image7.jpg',
				alt: 'image7',
				border: '0'
			}));
		case 8:
			return a({
				href: 'http://ibb.co/fHmwQv'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/hpMVkv/image8.jpg',
				alt: 'image8',
				border: '0'
			}));
		case 9:
			return a({
				href: 'http://ibb.co/nNvCyF'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/iOiMsa/image9.jpg',
				alt: 'image9',
				border: '0'
			}));
		case 10:
			return a({
				href: 'http://ibb.co/emUGQv'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/fK5qkv/image10.jpg',
				alt: 'image10',
				border: '0'
			}));
		case 11:
			return a({
				href: 'http://ibb.co/kaFCyF'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/nu8XyF/image11.jpg',
				alt: 'image11',
				border: '0'
			}));
		case 12:
			return a({
				href: 'http://ibb.co/gjYbQv'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/c1ngsa/image12.jpg',
				alt: 'image12',
				border: '0'
			}));
		case 13:
			return a({
				href: 'http://ibb.co/no3nXa'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/bsBwQv/image13.jpg',
				alt: 'image13',
				border: '0'
			}));
		case 14:
			return a({
				href: 'http://ibb.co/dpTzdF'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/k9HsyF/image14.jpg',
				alt: 'image14',
				border: '0'
			}));
		case 15:
			return a({
				href: 'http://ibb.co/fuhgsa'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/gZ0CyF/image15.jpg',
				alt: 'image15',
				border: '0'
			}));
		case 16:
			return a({
				href: 'http://ibb.co/mqAZCa'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/nOm7Xa/image16.jpg',
				alt: 'image16',
				border: '0'
			}));
		case 17:
			return a({
				href: 'http://ibb.co/dGh35v'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/gq1KdF/image17.jpg',
				alt: 'image17',
				border: '0'
			}));
		case 18:
			return a({
				href: 'http://ibb.co/j4TzdF'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/eo6Vkv/image18.jpg',
				alt: 'image18',
				border: '0'
			}));
		case 19:
			return a({
				href: 'http://ibb.co/ct8Msa'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/jTOAkv/image19.jpg',
				alt: 'image19',
				border: '0'
			}));
		case 20:
			return a({
				href: 'http://ibb.co/kP17Xa'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/n4LedF/image20.jpg',
				alt: 'image20',
				border: '0'
			}));
		case 21:
			return a({
				href: 'http://ibb.co/cvXsyF'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/kdVedF/image21.jpg',
				alt: 'image21',
				border: '0'
			}));
		case 22:
			return a({
				href: 'http://ibb.co/iVpGQv'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/d6kqkv/image22.jpg',
				alt: 'image22',
				border: '0'
			}));
		case 23:
			return a({
				href: 'http://ibb.co/kRL1sa'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/nzvZCa/image23.jpg',
				alt: 'image23',
				border: '0'
			}));
		case 24:
			return a({
				href: 'http://ibb.co/hiLO5v'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/bKGwQv/image24.jpg',
				alt: 'image24',
				border: '0'
			}));
		case 25:
			return a({
				href: 'http://ibb.co/joLO5v'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/bMoXyF/image25.jpg',
				alt: 'image25',
				border: '0'
			}));
		case 26:
			return a({
				href: 'http://ibb.co/i3puCa'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/jLyXyF/image26.jpg',
				alt: 'image26',
				border: '0'
			}));
		case 27:
			return a({
				href: 'http://ibb.co/mYm7Xa'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/gP8bQv/image27.jpg',
				alt: 'image27',
				border: '0'
			}));
		case 28:
			return a({
				href: 'http://ibb.co/gJxECa'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/b2bkJF/image28.jpg',
				alt: 'image28',
				border: '0'
			}));
		case 29:
			return a({
				href: 'http://ibb.co/hqaO5v'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/fH0qkv/image29.jpg',
				alt: 'image29',
				border: '0'
			}));
		case 30:
			return a({
				href: 'http://ibb.co/jup5JF'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/dVkedF/image30.jpg',
				alt: 'image30',
				border: '0'
			}));
		case 31:
			return a({
				href: 'http://ibb.co/my3nXa'
			}, img({
				'class': 'faq-img',
				src: 'http://preview.ibb.co/jQSECa/image31.jpg',
				alt: 'image31',
				border: '0'
			}));
	}
};

this.addressLast = function(){
	return last(
		split('/')(
			Router.current().originalUrl));
};

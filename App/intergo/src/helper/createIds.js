const createId = (len) => {
    let letra = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','v', 'u','w','x','y','z', '1' , '2' ,'3' , '4' ,'5','6','7','8','9','0'];
    let cad = ""
	for(let i=0; i < len; i++) {
		cad += letra[Math.floor(Math.random() * letra.length)];
	}

	return cad;
};

export default createId;
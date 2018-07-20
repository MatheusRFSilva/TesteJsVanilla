class Validacao {
  constructor(){
    this._nome = document.querySelector('#frm_nome');
    this._email = document.querySelector('#frm_email');
    this._cpf = document.querySelector('#frm_cpf');
    this._corCarro = document.querySelectorAll('input[name="radio_escolha"]');
    this._acessorios = document.querySelector('#frm_multiplo_1')
    this._tamanhoRoda = document.querySelector('#frm_aro');
    this._tamanhoPneu = document.querySelector('#frm_pneu');
    this._observacao = document.querySelector('#frm_textarea');
  }

  mascaraCPF( Mascara, evento) {

          let boleanoMascara;
          let campo = this._cpf.querySelector('input');
          let Digitato = evento.keyCode;
          let exp = /\-|\.|\/|\(|\)| /g
          let campoSoNumeros = campo.value.toString().replace( exp, "" );

          let posicaoCampo = 0;
          let NovoValorCampo="";
          let TamanhoMascara = campoSoNumeros.length;;

          if (Digitato != 8) {
                  for(let i=0; i<= TamanhoMascara; i++) {
                          boleanoMascara  = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                                                                  || (Mascara.charAt(i) == "/"))
                          boleanoMascara  = boleanoMascara || ((Mascara.charAt(i) == "(")
                                                                  || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))
                          if (boleanoMascara) {
                                  NovoValorCampo += Mascara.charAt(i);
                                    TamanhoMascara++;
                          }else {
                                  NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                                  posicaoCampo++;
                            }
                    }
                  campo.value = NovoValorCampo;
                    return true;
          }else {
                  return true;
          }
  }

  testaCPF(){
          let cpf = this._cpf.querySelector('input').value;
          let exp = /\.|\-/g
          cpf = cpf.toString().replace( exp, "" );
          let digitoDigitado = eval(cpf.charAt(9)+cpf.charAt(10));
          let soma1=0, soma2=0;
          let vlr =11;

          for(let i=0;i<9;i++){
                  soma1+=eval(cpf.charAt(i)*(vlr-1));
                  soma2+=eval(cpf.charAt(i)*vlr);
                  vlr--;
          }
          soma1 = (((soma1*10)%11)==10 ? 0:((soma1*10)%11));
          soma2=(((soma2+(2*soma1))*10)%11);

          let digitoGerado=(soma1*10)+soma2;
          if(digitoGerado!=digitoDigitado){
            return false;
          }
          return true;

  }

  validaNome(){


    let campoSmall = this._nome.querySelector('small');
    let nome = this._nome.querySelector('input').value.replace(/ /g,'');
    let regra = new RegExp('^[a-záàâãéèêíïóôõöúçñ ]+$',"i");
    campoSmall.innerHTML  = '';

    if(nome.length <10 || nome.length >50 ){
      campoSmall.innerHTML = 'O nome deve ter o minimo de 10 letras e no maximo 50';
      return false;
    }

    if(!regra.test(nome)){
      campoSmall.innerHTML ='Nome invalido';
      return false;
    }
    return true;

  }

  validaEmail(){

    let campoSmall = this._email.querySelector('small');
    let email = this._email.querySelector('input').value;
    let regra = new RegExp('^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$',"i");
    campoSmall.innerHTML  = '';
    if(email.length <5 || email.length >50){
      campoSmall.innerHTML  = 'E-mail deve ter tamanho entre 5 e 50 caracteres';
      return false;
    }

    if(!regra.test(email)){
        campoSmall.innerHTML = 'O e-mail é invalido!';
        return false;
    }
    return true;

  }

  validaCpf(){
    let campoSmall = this._cpf.querySelector('small');
    let cpf = this._cpf.querySelector('input').value;
    let regra = new RegExp('^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}')
    campoSmall.innerHTML = '';

    if(!regra.test(cpf) || !this.testaCPF()){
      campoSmall.innerHTML = 'CPF invalido!';
      return false;
    }
    return true

  }

  validaCorCarro(){
    let campoSmall = document.querySelector('#frm_unico small');
    let coresCarro = this._corCarro;
    let res = false;
    campoSmall.innerHTML = '';
    coresCarro.forEach(function(elem){

      if(elem.checked) res = true;

    });

    if(res) return true;
    campoSmall.innerHTML = 'Selecione a cor do carro'
    return false;
  }


validaTamanhoRoda(){
  let roda =   this._tamanhoRoda.querySelector('select');
  let campoSmall = this._tamanhoRoda.querySelector('small');
  campoSmall.innerHTML = '';
  if(roda.value==''){
      campoSmall.innerHTML = 'Selecione o Tamanho da Roda';
      return false;
  }
  return true;
}

validaTamanhoPneu(){
  let pneu =   this._tamanhoPneu.querySelector('select');
  let campoSmall = this._tamanhoPneu.querySelector('small');
  campoSmall.innerHTML = '';
  if(pneu.value==''){
      campoSmall.innerHTML = 'Selecione o Tamanho do Pneu';
      return false;
  }
  return true;
}

validaObservacao(){
  let obs = this._observacao.querySelector('textarea').value;
  let campoSmall = this._observacao.querySelector('small');
  let regra = new RegExp('^[\\w\\s]+',"i");
  campoSmall.innerHTML = '';
  if(!regra.test(obs) || obs.length >600){
    campoSmall.innerHTML = 'Observacao invalida';
    return false;
  }
  return true;
}

limpaCampos(){
  this._nome.querySelector('small').innerHTML = '';
  this._email.querySelector('small').innerHTML = '';
  this._cpf.querySelector('small').innerHTML = '';
  document.querySelector('#frm_unico small').innerHTML = '';
  this._acessorios.querySelector('small').innerHTML = '';
  this._tamanhoRoda.querySelector('small').innerHTML = '';
  this._tamanhoPneu.querySelector('small').innerHTML = '';
  this._observacao.querySelector('small').innerHTML = '';
}

get corCarro(){
  let coresCarro = this._corCarro;
  let cor = "";

  coresCarro.forEach(function(elem){
    if(elem.checked) cor = elem.value;
  });
  return cor;
}

get formulario(){
  return {
    nome : this._nome.querySelector('input').value,
    email: this._email.querySelector('input').value,
    cpf : this._cpf.querySelector('input').value,
    corDoCarro: this.corCarro,
    acessorios : this._acessorios.querySelector('input').checked,
    tamanhoDaRoda: this._tamanhoRoda.querySelector('select').value,
    tamanhoDoPneu: this._tamanhoPneu.querySelector('select').value,
    observacaoDoPedido : this._observacao.querySelector('textarea').value
  }
}

  enviar(){
    if(!this.validaNome()) return;
    if(!this.validaEmail()) return;
    if(!this.validaCpf())return;
    if(!this.validaCorCarro())return;
    if(!this.validaTamanhoRoda())return;
    if(!this.validaTamanhoPneu())return;
    if(!this.validaObservacao())return;

     console.log(this.formulario);
     return this.formulario;
  }


}

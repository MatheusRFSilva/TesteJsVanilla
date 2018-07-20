'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validacao = function () {
  function Validacao() {
    _classCallCheck(this, Validacao);

    this._nome = document.querySelector('#frm_nome');
    this._email = document.querySelector('#frm_email');
    this._cpf = document.querySelector('#frm_cpf');
    this._corCarro = document.querySelectorAll('input[name="radio_escolha"]');
    this._acessorios = document.querySelector('#frm_multiplo_1');
    this._tamanhoRoda = document.querySelector('#frm_aro');
    this._tamanhoPneu = document.querySelector('#frm_pneu');
    this._observacao = document.querySelector('#frm_textarea');
  }

  _createClass(Validacao, [{
    key: 'mascaraCPF',
    value: function mascaraCPF(Mascara, evento) {

      var boleanoMascara = void 0;
      var campo = this._cpf.querySelector('input');
      var Digitato = evento.keyCode;
      var exp = /\-|\.|\/|\(|\)| /g;
      var campoSoNumeros = campo.value.toString().replace(exp, "");

      var posicaoCampo = 0;
      var NovoValorCampo = "";
      var TamanhoMascara = campoSoNumeros.length;;

      if (Digitato != 8) {
        for (var i = 0; i <= TamanhoMascara; i++) {
          boleanoMascara = Mascara.charAt(i) == "-" || Mascara.charAt(i) == "." || Mascara.charAt(i) == "/";
          boleanoMascara = boleanoMascara || Mascara.charAt(i) == "(" || Mascara.charAt(i) == ")" || Mascara.charAt(i) == " ";
          if (boleanoMascara) {
            NovoValorCampo += Mascara.charAt(i);
            TamanhoMascara++;
          } else {
            NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
            posicaoCampo++;
          }
        }
        campo.value = NovoValorCampo;
        return true;
      } else {
        return true;
      }
    }
  }, {
    key: 'testaCPF',
    value: function testaCPF() {
      var cpf = this._cpf.querySelector('input').value;
      var exp = /\.|\-/g;
      cpf = cpf.toString().replace(exp, "");
      var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
      var soma1 = 0,
          soma2 = 0;
      var vlr = 11;

      for (var i = 0; i < 9; i++) {
        soma1 += eval(cpf.charAt(i) * (vlr - 1));
        soma2 += eval(cpf.charAt(i) * vlr);
        vlr--;
      }
      soma1 = soma1 * 10 % 11 == 10 ? 0 : soma1 * 10 % 11;
      soma2 = (soma2 + 2 * soma1) * 10 % 11;

      var digitoGerado = soma1 * 10 + soma2;
      if (digitoGerado != digitoDigitado) {
        return false;
      }
      return true;
    }
  }, {
    key: 'validaNome',
    value: function validaNome() {

      var campoSmall = this._nome.querySelector('small');
      var nome = this._nome.querySelector('input').value.replace(/ /g, '');
      var regra = new RegExp('^[a-záàâãéèêíïóôõöúçñ ]+$', "i");
      campoSmall.innerHTML = '';

      if (nome.length < 10 || nome.length > 50) {
        campoSmall.innerHTML = 'O nome deve ter o minimo de 10 letras e no maximo 50';
        return false;
      }

      if (!regra.test(nome)) {
        campoSmall.innerHTML = 'Nome invalido';
        return false;
      }
      return true;
    }
  }, {
    key: 'validaEmail',
    value: function validaEmail() {

      var campoSmall = this._email.querySelector('small');
      var email = this._email.querySelector('input').value;
      var regra = new RegExp('^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$', "i");
      campoSmall.innerHTML = '';
      if (email.length < 5 || email.length > 50) {
        campoSmall.innerHTML = 'E-mail deve ter tamanho entre 5 e 50 caracteres';
        return false;
      }

      if (!regra.test(email)) {
        campoSmall.innerHTML = 'O e-mail é invalido!';
        return false;
      }
      return true;
    }
  }, {
    key: 'validaCpf',
    value: function validaCpf() {
      var campoSmall = this._cpf.querySelector('small');
      var cpf = this._cpf.querySelector('input').value;
      var regra = new RegExp('^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}');
      campoSmall.innerHTML = '';

      if (!regra.test(cpf) || !this.testaCPF()) {
        campoSmall.innerHTML = 'CPF invalido!';
        return false;
      }
      return true;
    }
  }, {
    key: 'validaCorCarro',
    value: function validaCorCarro() {
      var campoSmall = document.querySelector('#frm_unico small');
      var coresCarro = this._corCarro;
      var res = false;
      campoSmall.innerHTML = '';
      coresCarro.forEach(function (elem) {

        if (elem.checked) res = true;
      });

      if (res) return true;
      campoSmall.innerHTML = 'Selecione a cor do carro';
      return false;
    }
  }, {
    key: 'validaTamanhoRoda',
    value: function validaTamanhoRoda() {
      var roda = this._tamanhoRoda.querySelector('select');
      var campoSmall = this._tamanhoRoda.querySelector('small');
      campoSmall.innerHTML = '';
      if (roda.value == '') {
        campoSmall.innerHTML = 'Selecione o Tamanho da Roda';
        return false;
      }
      return true;
    }
  }, {
    key: 'validaTamanhoPneu',
    value: function validaTamanhoPneu() {
      var pneu = this._tamanhoPneu.querySelector('select');
      var campoSmall = this._tamanhoPneu.querySelector('small');
      campoSmall.innerHTML = '';
      if (pneu.value == '') {
        campoSmall.innerHTML = 'Selecione o Tamanho do Pneu';
        return false;
      }
      return true;
    }
  }, {
    key: 'validaObservacao',
    value: function validaObservacao() {
      var obs = this._observacao.querySelector('textarea').value;
      var campoSmall = this._observacao.querySelector('small');
      var regra = new RegExp('^[\\w\\s]+', "i");
      campoSmall.innerHTML = '';
      if (!regra.test(obs) || obs.length > 600) {
        campoSmall.innerHTML = 'Observacao invalida';
        return false;
      }
      return true;
    }
  }, {
    key: 'limpaCampos',
    value: function limpaCampos() {
      this._nome.querySelector('small').innerHTML = '';
      this._email.querySelector('small').innerHTML = '';
      this._cpf.querySelector('small').innerHTML = '';
      document.querySelector('#frm_unico small').innerHTML = '';
      this._acessorios.querySelector('small').innerHTML = '';
      this._tamanhoRoda.querySelector('small').innerHTML = '';
      this._tamanhoPneu.querySelector('small').innerHTML = '';
      this._observacao.querySelector('small').innerHTML = '';
    }
  }, {
    key: 'enviar',
    value: function enviar() {
      if (!this.validaNome()) return;
      if (!this.validaEmail()) return;
      if (!this.validaCpf()) return;
      if (!this.validaCorCarro()) return;
      if (!this.validaTamanhoRoda()) return;
      if (!this.validaTamanhoPneu()) return;
      if (!this.validaObservacao()) return;

      console.log(this.formulario);
      return this.formulario;
    }
  }, {
    key: 'corCarro',
    get: function get() {
      var coresCarro = this._corCarro;
      var cor = "";

      coresCarro.forEach(function (elem) {
        if (elem.checked) cor = elem.value;
      });
      return cor;
    }
  }, {
    key: 'formulario',
    get: function get() {
      return {
        nome: this._nome.querySelector('input').value,
        email: this._email.querySelector('input').value,
        cpf: this._cpf.querySelector('input').value,
        corDoCarro: this.corCarro,
        acessorios: this._acessorios.querySelector('input').checked,
        tamanhoDaRoda: this._tamanhoRoda.querySelector('select').value,
        tamanhoDoPneu: this._tamanhoPneu.querySelector('select').value,
        observacaoDoPedido: this._observacao.querySelector('textarea').value
      };
    }
  }]);

  return Validacao;
}();
//# sourceMappingURL=Validacao.js.map
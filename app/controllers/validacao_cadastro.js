class Validacao_Cadastro
{
    constructor(user)
    {
        this._user = user;
    }

    valida()
    {
        this.verificaCamposEmBranco();
        this.verificaSenhas();
        return this._user;
    }
    verificaCamposEmBranco()
    {
        if(!this._user.nome)
        {
            this._user.setErro('O Campo Nome Deve Ser Preenchido');
            this._user.class = 'invalid';
        }
        if(!this._user.sobrenome)
        {
            this._user.setErro('O Campo Sobrenome Deve Ser Preenchido');
            this._user.class = 'invalid';
        }
        if(!this._user.username)
        {
            this._user.setErro('O Campo Username Deve Ser Preenchido');
            this._user.class = 'invalid';
        }
        if(!this._user.data_nasc)
        {
            this._user.setErro('O Campo Data de Nascimento Deve Ser Preenchido');
            this._user.class = 'invalid';
        }
        if(!this._user.senha)
        {
            this._user.setErro('O Campo Senha Deve Ser Preenchido');
            this._user.class = 'invalid';
        }
        if(!this._user.repsenha)
        {
            this._user.setErro('O Campo Repetir Senha Deve Ser Preenchido');
            this._user.class = 'invalid';
        }
    }

    verificaSenhas()
    {
        if(this._user.senha != this._user.repsenha)
        {
            this._user.erros.push('As Senhas Devem Ser Iguais');
            this._user.senha = '';
            this._user.repsenha = '';
            this._user.class = 'invalid';                
        }
    }
}

module.exports = Validacao_Cadastro;
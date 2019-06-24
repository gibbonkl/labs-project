class Modelo_Usuario_Cadastro
{
    constructor()
    {
        this.nome = '';
        this.sobrenome = '';
        this.username = '';
        this.email = '';          
        this.data_nasc = '';
        this.senha = '';
        this.repsenha = '';
        this.erros = [];
        this.class = '';
        this.tipo = '';
    }
    preencheAutomatico(body)
    {
        this.nome = body.nome;
        this.sobrenome = body.sobrenome;
        this.username = body.username;
        this.email = body.email;                
        this.data_nasc = body.data_nasc;
        this.senha = body.senha;
        this.repsenha = body.repsenha;
        this.erros = [];
        this.class = '';
    }

    temErro()
    {
        if(this.erros.length > 0)
            return true;
        else 
            return false;
    }

    setErro(erro)
    {
        this.erros.push(erro);
    }

    getUser()
    {
        let user = 
        {
            nome: this.nome,
            sobrenome: this.sobrenome,
            username: this.username,
            email: this.email,                
            data_nasc: this.data_nasc,
            senha: this.senha,
            repsenha: this.repsenha,
            erros : this.erros,
            invalidClass : this.class,
            tipo: this.tipo
        }

        return user;
    }

    erroUsuarioExistente()
    {
        this.erros.push('Username ou Email Já Existente');
        this.username = '';
        this.email = '';
        this.class = 'invalid';
    }

}

module.exports = Modelo_Usuario_Cadastro;
import React from 'react'

const formFrield = [
  {
    id: 'nome',
    label: 'Digite seu Nome:',
    type: 'text' 
  },
  {
    id: 'email',
    label: 'Digite seu Email:',
    type: 'email' 
  },
  {
    id: 'senha',
    label: 'Digite sua senha:',
    type: 'password' 
  },
  {
    id: 'senha-re',
    label: 'Digite sua senha novamente:',
    type: 'password' 
  },
]

const FormCadastro = () => {
  return (
    <>
        <h2>Cadastro</h2>
            <form onSubmit={handleSubmit}>
              {

              }
                <Input Cor={cor} imagem={IconUser} type="email" id="email" name="email" {...email} >Email</Input>
                <Input Cor={cor} imagem={IconLock} type="password" id="senha" name="senha" {...senha}>Senha</Input>
                {message}
                <Button Cor={cor}>Login</Button>
            </form>
        <p>Não e cadastrado? <NavLink className="Link" to="/cadastro" ><strong>Cadastre-se</strong></NavLink></p>
    </>
  )
}

export default FormCadastro
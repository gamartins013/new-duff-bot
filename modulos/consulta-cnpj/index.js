const axios = require("axios");

async function consultaCnpj(client, args, message) {
  const cnpj = args[1];
  const url = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`;
  const getCnpj = await axios.get(url);
  await client.reply(
    message.from,
    `
*Cnpj:* ${getCnpj.data.cnpj}
*Situação:* ${getCnpj.data.situacao}
*Nome:* ${getCnpj.data.nome}
*Nome Fantasia:* ${getCnpj.data.fantasia}
*Porte:* ${getCnpj.data.porte}
*Capital Social:* ${getCnpj.data.capital_social}
*Abertura:* ${getCnpj.data.abertura}
*Atividade Principal:* ${getCnpj.data.atividade_principal[0].text}
*Atividades Secundarias:* \n${getCnpj.data.atividades_secundarias.map(atividade => atividade.text).join("\n")}	
*Nome Sócio:* ${getCnpj.data.qsa.map(atividade => atividade.nome).join("\n")}
*Longradouro:* ${getCnpj.data.logradouro}
*Número:* ${getCnpj.data.numero}
*Complemento:* ${getCnpj.data.complemento}
*Bairro:* ${getCnpj.data.bairro}
*Cidade:* ${getCnpj.data.municipio}
*Estado:* ${getCnpj.data.uf}
*Cep:* ${getCnpj.data.cep}
*Telefone:* ${getCnpj.data.telefone}
*E-mail:* ${getCnpj.data.email}


          `,
    message.id
  );

 
}

module.exports = consultaCnpj;

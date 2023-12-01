import { validUsers } from '../../imports/api/links';
import { votacaoTotal } from '../../imports/api/votacaoTotal';


const obterCPF = (cpf) => {
    let result = validUsers.findOne({ cpf })
    return result
};

const votou = (cpf) => {
    validUsers.update({ cpf: cpf }, { $set: { voto: true } })
}

const salveVotacao = (payload) => {
    let valid = validUsers.findOne({ cpf: payload.cpf })
    if (!valid.voto) {
        payload.data.forEach(element => {
            let { total } = votacaoTotal.findOne({ startup: element.startup })
            votacaoTotal.update({ startup: element.startup }, { $set: { total: total + element.total } })
        });
        votou(payload.cpf)
        return {
            status: 200,
            text: 'Voto cadastrado'
        }
    }

    return {
        status: 400,
        text: 'Aconteceu alguma coisa!'
    }
}

Meteor.methods({
    async getCPF(cpf) {
        return await obterCPF(cpf);
    },
    async activeVote(cpf) {
        return await votou(cpf);
    },
    async saveVotacao(data) {
        return await salveVotacao(data);
    },
});

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import logo from "./logo.vue";

const cpf = ref(null);

const group1Tecnologia = ref(null);
const group1Inovacao = ref(null);
const group1Criatividade = ref(null);
const group1Social = ref(null);

const group2Tecnologia = ref(null);
const group2Inovacao = ref(null);
const group2Criatividade = ref(null);
const group2Social = ref(null);

const group3Tecnologia = ref(null);
const group3Inovacao = ref(null);
const group3Criatividade = ref(null);
const group3Social = ref(null);

const group4Tecnologia = ref(null);
const group4Inovacao = ref(null);
const group4Criatividade = ref(null);
const group4Social = ref(null);

const state = ref(null);

const valid = ref(false);

const prev = () => {
  if (state.value == 1) {
    state.value = 1;
    return;
  }

  if (state.value == 2) {
    state.value = 1;
    return;
  }

  if (state.value == 3) {
    state.value = 2;
    return;
  }

  if (state.value == 4) {
    state.value = 3;
    return;
  }

  if (state.value == 5) {
    state.value = 4;
    return;
  }
};

const next = () => {
  if (state.value == 1) {
    if (
      group1Tecnologia.value &&
      group1Inovacao.value &&
      group1Criatividade.value &&
      group1Social.value
    ) {
      state.value = 2;
    }
  }

  if (state.value == 2) {
    if (
      group2Tecnologia.value &&
      group2Inovacao.value &&
      group2Criatividade.value &&
      group2Social.value
    ) {
      state.value = 3;
    }
  }

  if (state.value == 3) {
    if (
      group3Tecnologia.value &&
      group3Inovacao.value &&
      group3Criatividade.value &&
      group3Social.value
    ) {
      state.value = 4;
    }
  }

  if (state.value == 4) {
    if (
      group4Tecnologia.value &&
      group4Inovacao.value &&
      group4Criatividade.value &&
      group4Social.value
    ) {
      state.value = 5;
    }
  }
};

const save = () => {
  let payload = {
    cpf: cpf.value,
    data: [
      {
        startup: 1,
        total:
          group1Tecnologia.value +
          group1Inovacao.value +
          group1Criatividade.value +
          group1Social.value,
      },
      {
        startup: 2,
        total:
          group2Tecnologia.value +
          group2Inovacao.value +
          group2Criatividade.value +
          group2Social.value,
      },
      {
        startup: 3,
        total:
          group3Tecnologia.value +
          group3Inovacao.value +
          group3Criatividade.value +
          group3Social.value,
      },
      {
        startup: 4,
        total:
          group4Tecnologia.value +
          group4Inovacao.value +
          group4Criatividade.value +
          group4Social.value,
      },
    ],
  };
  Meteor.call("saveVotacao", payload, (err, res) => {
    if (res) {
      if (res.status == 200) {
        Swal.fire("Voto cadastrado com sucesso!");
        valid.value = false;
        cpf.value = null;
        state.value = 1;
        cleanRating();
        return;
      }
      Swal.fire("Aconteceu algum erro, informe a equipe!");
      return;
    }
    Swal.fire("Tenta novamente mais tarde!");
  });
};

const cleanRating = () => {
  group1Tecnologia.value = null;
  group1Inovacao.value = null;
  group1Criatividade.value = null;
  group1Social.value = null;

  group2Tecnologia.value = null;
  group2Inovacao.value = null;
  group2Criatividade.value = null;
  group2Social.value = null;

  group3Tecnologia.value = null;
  group3Inovacao.value = null;
  group3Criatividade.value = null;
  group3Social.value = null;

  group4Tecnologia.value = null;
  group4Inovacao.value = null;
  group4Criatividade.value = null;
  group4Social.value = null;
};

const getCPF = () => {
  Meteor.call("getCPF", cpf.value, (err, res) => {
    console.log(res);
    if (res?.cpf) {
      if (res.voto) {
        Swal.fire("Você já votou!");
        return;
      }
      valid.value = true;
      return;
    }
    Swal.fire("Não encontramos seu CPF na nossa base :(");
  });
};
</script>

<template>
  <div class="d-flex justify-center">
    <logo></logo>
  </div>
  <v-container>
    <v-row class="d-flex justify-center" v-if="!valid">
      <v-col cols="12" lg="6" md="8" sm="12">
        <v-col cols="12">
          <v-text-field
            v-model="cpf"
            label="Informe seu CPF"
            variant="solo"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" :block="true" @click="getCPF()">
            Enviar
          </v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-if="valid">
    <v-container>
      <v-stepper
        prev-text="Voltar"
        v-model="state"
        mobile
        rounded="lg"
        next-text="Avançar"
        :items="[
          'Pergunta 1',
          'Pergunta 2',
          'Pergunta 3',
          'Pergunta 4',
          'Enviar',
        ]"
      >
        <template v-slot:actions>
          <v-row class="justify-space-between pa-5">
            <v-btn color="orange" class="text-white" @click="prev()">
              Voltar
            </v-btn>
            <v-btn color="primary" @click="next()"> Avançar </v-btn>
          </v-row>
        </template>
        <template v-slot:item.1>
          <v-card flat>
            Como vocês avaliam o case Startup 01 com o Tema: Projeto CSIS -
            Vigilância Universitária da Palestrante: Babacar Mane nos itens
            abaixo?

            <v-container>
              <v-col>
                <v-row>
                  <v-label> Tecnologia </v-label>
                  <v-col sm="3">
                    <v-rating
                      v-model="group1Tecnologia"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
                <v-row>
                  <v-label> Inovação </v-label>

                  <v-col sm="3">
                    <v-rating
                      v-model="group1Inovacao"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
                <v-row>
                  <v-label> Criatividade </v-label>

                  <v-col sm="3">
                    <v-rating
                      v-model="group1Criatividade"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
                <v-row>
                  <v-label> Impacto Social </v-label>

                  <v-col sm="3">
                    <v-rating
                      v-model="group1Social"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
              </v-col>
            </v-container>
          </v-card>
        </template>

        <template v-slot:item.2>
          <v-card flat>
            Como vocês avaliam o Case Startup 02 - Empresa Innovatex com o Tema:
            Projeto de Automação de coleta de dados em redes sociais.
            Palestrante: Marcos Almeida Costa

            <v-container>
              <v-col>
                <v-row>
                  <v-label> Tecnologia </v-label>
                  <v-col sm="3">
                    <v-rating
                      v-model="group2Tecnologia"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
                <v-row>
                  <v-label> Inovação </v-label>

                  <v-col sm="3">
                    <v-rating
                      v-model="group2Inovacao"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
                <v-row>
                  <v-label> Criatividade </v-label>

                  <v-col sm="3">
                    <v-rating
                      v-model="group2Criatividade"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
                <v-row>
                  <v-label> Impacto Social </v-label>

                  <v-col sm="3">
                    <v-rating
                      v-model="group2Social"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
              </v-col>
            </v-container>
          </v-card>
        </template>

        <template v-slot:item.3>
          <v-card flat>
            Como vocês avaliam o case Startup 03 - Empresa Vigilante. Tema:
            Projeto Vigilante 2.0 - Serviço de Gestão autônoma de vigilância
            colaborativa. Palestrante: Rafael Câmara

            <v-container>
              <v-col>
                <v-row>
                  <v-label> Tecnologia </v-label>
                  <v-col sm="3">
                    <v-rating
                      v-model="group3Tecnologia"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
                <v-row>
                  <v-label> Inovação </v-label>

                  <v-col sm="3">
                    <v-rating
                      v-model="group3Inovacao"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
                <v-row>
                  <v-label> Criatividade </v-label>

                  <v-col sm="3">
                    <v-rating
                      v-model="group3Criatividade"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
                <v-row>
                  <v-label> Impacto Social </v-label>

                  <v-col sm="3">
                    <v-rating
                      v-model="group3Social"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
              </v-col>
            </v-container>
          </v-card>
        </template>
        <template v-slot:item.4>
          <v-card flat>
            Como vocês avaliam o case Startup 04 - Empresa XTesting. Tema:
            Projeto Carol - Violência Doméstica contra Mulher. Palestrante:
            marcos Dratovsky

            <v-container>
              <v-col>
                <v-row>
                  <v-label> Tecnologia </v-label>
                  <v-col sm="3">
                    <v-rating
                      v-model="group4Tecnologia"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
                <v-row>
                  <v-label> Inovação </v-label>

                  <v-col sm="3">
                    <v-rating
                      v-model="group4Inovacao"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
                <v-row>
                  <v-label> Criatividade </v-label>

                  <v-col sm="3">
                    <v-rating
                      v-model="group4Criatividade"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
                <v-row>
                  <v-label> Impacto Social </v-label>

                  <v-col sm="3">
                    <v-rating
                      v-model="group4Social"
                      color="blue-lighten-1"
                      active-color="yellow"
                    ></v-rating>
                  </v-col>
                </v-row>
              </v-col>
            </v-container>
          </v-card>
        </template>
        <template v-slot:item.5>
          <v-card class="d-flex justify-center"
            ><v-btn @click="save" color="primary">Enviar</v-btn>
          </v-card>
        </template>
      </v-stepper>
    </v-container>
  </v-container>
</template>

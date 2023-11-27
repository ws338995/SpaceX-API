<script setup>
import { ref, onMounted } from 'vue'

import { userStore } from '../stores/user';
import Chip from './Chip.vue';

const usr = userStore();

const props = defineProps({
  rocket: Object,
})

let activePayload = ref(false);
let activeStage1 = ref(false);
let activeStage2 = ref(false);
let activePropulsion = ref(false);

function selectPayload(){
  activePayload.value = !activePayload.value;
  activeStage1.value = false;
  activeStage2.value = false;
  activePropulsion.value = false;
}
function selectStage1(){
  activeStage1.value = !activeStage1.value;
  activePayload.value = false;
  activeStage2.value = false;
  activePropulsion.value = false;
}
function selectStage2(){
  activeStage2.value = !activeStage2.value;
  activePayload.value = false;
  activeStage1.value = false;
  activePropulsion.value = false;
}
function selectProp(){
  activePropulsion.value = !activePropulsion.value;
  activeStage2.value = false;
  activePayload.value = false;
  activeStage1.value = false;
}

</script>

<template>
    <div>
        <div>
          <svg ref="rocket" class="rocket " :class="{ 'payloadSelected': activePayload, 'stage2Selected': activeStage2, 'stage1Selected': activeStage1,'propSelected': activePropulsion }" viewBox="0 -3 120 530">
            <g id="payload" class="selection" @click="selectPayload">
              <path
                :class="{shapeSelected: activePayload}"
                class="cls-1"
                d="M318.07,57.44a39.44,39.44,0,0,0-20,32.63v64l6.25,11.08H332l6.25-10.92V91.63a45.58,45.58,0,0,0-8-22.41A44.93,44.93,0,0,0,318.07,57.44Z"
                transform="translate(-269.29 -56.27)"
              />
              <line class="cls-2" x1="68.92" y1="97.94" x2="28.8" y2="97.79" />
              <line class="cls-2" x1="48.86" y1="108.66" x2="48.78" y2="1.17" />
            </g>
            <g id="body" class="selection" @click="selectStage2">
              <polygon
                :class="{shapeSelected: activeStage2}"
                class="cls-1"
                points="35.05 108.87 62.67 108.87 62.67 511.41 35.05 511.41 35.05 172.97 35.05 108.87"
              />
              <line class="cls-1" x1="35.05" y1="172.97" x2="62.67" y2="172.97" />
              <line class="cls-1" x1="35.05" y1="220.57" x2="62.67" y2="220.57" />
              <path
                class="cls-1"
                d="M329,567.68"
                transform="translate(-269.29 -56.27)"
              />
            </g>
            <!-- <g id="boosters" class="selection" @click="selectStage1">
              <path
                :class="{shapeSelected: activeStage1}"
                class="cls-1"
                d="M336.59,243.24h27.68c.22-3.67.35-14.35-7-23.42a30.57,30.57,0,0,0-6.87-6.24,33.13,33.13,0,0,0-8.63,9A34.49,34.49,0,0,0,336.59,243.24Z"
                transform="translate(-269.29 -56.27)"
              />
              <polyline
                :class="{shapeSelected: activeStage1}"
                class="cls-1"
                points="67.31 186.96 67.31 223.23 67.31 511.41 95.71 511.41 94.98 186.96"
              />
              <polyline
                :class="{shapeSelected: activeStage1}"
                class="cls-1"
                points="67.31 223.23 62.67 223.23 62.67 226.5 67.31 226.5"
              />
              <polyline
                :class="{shapeSelected: activeStage1}"
                class="cls-1"
                points="67.31 389.88 62.67 389.88 62.67 393.29 67.31 393.29"
              />
              <path
                :class="{shapeSelected: activeStage1}"
                class="cls-1"
                d="M271.67,243.24h27.68c.21-3.67.34-14.35-7-23.42a30.76,30.76,0,0,0-6.86-6.24,33.14,33.14,0,0,0-8.64,9A34.53,34.53,0,0,0,271.67,243.24Z"
                transform="translate(-269.29 -56.27)"
              />
              <polyline
                :class="{shapeSelected: activeStage1}"
                class="cls-1"
                points="2.38 186.96 2.38 223.23 2.38 511.41 30.79 511.41 30.14 223.4 30.06 186.96"
              />
              <polyline
                :class="{shapeSelected: activeStage1}"
                class="cls-1"
                points="30.14 223.4 35.05 223.4 35.05 226.59 30.14 226.59"
              />
              <polyline
                :class="{shapeSelected: activeStage1}"
                class="cls-1"
                points="30.51 390.03 35.05 390.03 35.05 393.23 30.52 393.23"
              />
              <polyline
                :class="{shapeSelected: activeStage1}"
                class="cls-1"
                points="67.31 507.56 62.67 507.56 62.67 510.73 67.31 510.73"
              />
              <polyline
                :class="{shapeSelected: activeStage1}"
                class="cls-1"
                points="30.79 510.73 35.05 510.73 35.05 507.56 30.79 507.56"
              />
            </g> -->
            <g id="engines" class="selection" @click="selectProp">
              <!-- <polygon
                :class="{shapeSelected: activePropulsion}"
                class="cls-1"
                points="6.25 511.41 1.49 523.04 30.79 523.04 26.7 511.41 6.25 511.41"
              /> -->
              <polygon
                :class="{shapeSelected: activePropulsion}"
                class="cls-1"
                points="41.52 511.41 34.58 523.04 63.38 523.04 56.98 511.41 41.52 511.41"
              />
              <!-- <polygon
                :class="{shapeSelected: activePropulsion}"
                class="cls-1"
                points="72.51 511.41 66.81 523.04 95.71 523.04 90.85 511.41 72.51 511.41"
              /> -->
            </g>
          </svg>
        </div>


        <div class="infoBox" v-if="activePayload">
          <div class="content">
            <h1 style="display:inline-block">Payload</h1>
            <div style="display:inline-block; float:right;">
              <Chip v-if="props.rocket.second_stage.reusable" text="Reusable" color="green" outlined/>
              <Chip v-else text="Non-Reusable" color="red" outlined/>
            </div>
            <hr/>
            <div class="content-text">
              <h3>Composite Fairing</h3>
              <p>Height: <b>{{ props.rocket.second_stage.payloads.composite_fairing.height[usr.getUnitsSize]  }} {{ usr.getUnitsSize }}</b></p>
              <p>Diameter: <b>{{ props.rocket.second_stage.payloads.composite_fairing.diameter[usr.getUnitsSize] }} {{ usr.getUnitsSize }}</b></p>
            </div>
            <div class="content-text">
              <h3>Payload Weights Capacity</h3>
              <Chip v-for="pw in props.rocket.payload_weights" :key="pw.id"
              :text="pw.name + ': ' + pw[usr.getUnitsWeight] + ' ' + usr.getUnitsWeight" 
              outlined 
              color="white"
              />
            </div>
          </div>
        </div>

        <div class="infoBox" v-if="activeStage2">
          <div class="content">
            <h1 style="display:inline-block">First Stage</h1>
            <div style="display:inline-block; float:right;">
              <Chip v-if="props.rocket.first_stage.reusable" text="Reusable" color="green" outlined/>
              <Chip v-else text="Non-Reusable" color="red" outlined/>
            </div>
            <hr/>
            <div class="content-text">
              <h3>Trust</h3>
              <p>Thrust at Sea Level: <b>{{ props.rocket.first_stage.thrust_sea_level[usr.getUnitsForce] }} {{ usr.getUnitsForce }}</b></p>
              <p>Thrust in Vacuum: <b>{{ props.rocket.first_stage.thrust_sea_level[usr.getUnitsForce] }} {{ usr.getUnitsForce }}</b></p>
            </div>
            <hr/>
            <div class="content-text">
              <h3>Information</h3>
              <p>Number of engines used: <b>{{ props.rocket.first_stage.engines }}</b></p>
              <p>Amount of Fuel: <b>{{ props.rocket.first_stage.fuel_amount_tons }} tons</b></p>
              <p>Burn Time: <b>{{ props.rocket.first_stage.burn_time_sec }} seconds</b></p>
            </div>
          </div>
          <div class="content">
            <h1 style="display:inline-block">Second Stage</h1>
            <div style="display:inline-block; float:right;">
              <Chip v-if="props.rocket.second_stage.reusable" text="Reusable" color="green" outlined/>
              <Chip v-else text="Non-Reusable" color="red" outlined/>
            </div>
            <hr/>
            <div class="content-text">
              <h3>Information</h3>
              <p>Thrust: <b>{{ props.rocket.second_stage.thrust[usr.getUnitsForce] }} {{ usr.getUnitsForce }}</b></p>
              <p>Number of engines used: <b>{{ props.rocket.second_stage.engines }}</b></p>
              <p>Amount of Fuel: <b>{{ props.rocket.second_stage.fuel_amount_tons }} tons</b></p>
              <p>Burn Time: <b>{{ props.rocket.second_stage.burn_time_sec }} seconds</b></p>
            </div>
          </div>
        </div>


        <div class="infoBox" v-if="activePropulsion">
          <div class="content">
              <h2>Propulsion (Engines)</h2>
              <hr/>
              <div class="content-text">
                <h3>Information</h3>
                <p>Total Number of Engines: <b>{{ props.rocket.engines.number }}</b></p>
                <p>Type: <b>{{ props.rocket.engines.type }}</b></p>
                <p>Layout: <b>{{ props.rocket.engines.layout }}</b></p>
                <p>Max Engine Loos: <b>{{ props.rocket.engines.engine_loss_max }} engines</b></p>
                <p>Thrust to Weight: <b>{{ props.rocket.engines.thrust_to_weight }}</b></p>
              </div>
              <hr/>
              <div class="content-text">
                <h3>Fuel Types</h3>
                <Chip v-if="props.rocket.engines.propellant_1" :text="props.rocket.engines.propellant_1" color="gray" style="display:inline-block; margin-right:3px;"/>
                <Chip v-if="props.rocket.engines.propellant_2" :text="props.rocket.engines.propellant_2" color="gray" style="display:inline-block"/>
              </div>
              <div class="content-text">
                <h3>Thrust</h3>
                <p>Thrust at Sea Level: <b>{{ props.rocket.engines.thrust_sea_level[usr.getUnitsForce] }} {{ usr.getUnitsForce }}</b></p>
                <p>Thrust in a Vacuum: <b>{{ props.rocket.engines.thrust_vacuum[usr.getUnitsForce] }} {{ usr.getUnitsForce }}</b></p>
                <p>Burn Time: <b>{{ props.rocket.engines.burn_time_sec }} seconds</b></p>
              </div>
              <hr/>
              <div class="content-text">
                <h3>ISP (Specific Impulse)</h3>
                <p>Sea Level: <b>{{ props.rocket.engines.isp.sea_level }} seconds</b></p>
                <p>Vacuum: <b>{{ props.rocket.engines.isp.vacuum }} seconds</b></p>
              </div>
            </div>
          </div>
    </div>
</template>

<style scoped>
.cls-1, .cls-2 {
  fill: rgba(255,255,255,0);
  stroke: #a8a8a8;
  stroke-miterlimit: 10;
  transition:0.1s;
}
.selection:hover * {
  fill: rgba(170, 120, 12,0.3);
  cursor: pointer;
}
.cls-1 {
  stroke-width: 2px;
}
h3{
  color:#464646;
}
.propSelected{
    width: 250px !important;
    height: 110vh !important;
    transform: translateY(-550px);
}
.stage1Selected{
    width: 400px !important;
    height: 110vh !important;
    transform: translateY(-250px);
}
.stage2Selected{
    width: 450px !important;
    height: 100vh !important;
    transform: translateY(-100px);
}
.payloadSelected{
    width: 450px !important;
    height: 250vh !important;
}
.shapeSelected{
  fill: rgba(170, 120, 12,0.7);
}
.rocket{
    width:250px;
    height: 90vh;
    transition:0.5s ease;
}
b{
  font-weight: 600;
}
.infoBox{
    overflow: hidden;
    position: absolute;
    max-width:350px;
    /* max-height:fit-content; */
    border-left:5px solid rgb(170, 120, 12);
    background-color:rgba(12,12,12,0.9);
    box-shadow:0 0 20px black;
    top:20vh;
    left:0;right:0;
    padding:10px;
    margin:auto;
    animation: text-box-open 2s ease;
}
.infoBox .content{
  width:90vw;
  height: auto;
  overflow: hidden;
}
.content-text{
  margin: 10px 0;
}

@keyframes text-box-open{
    0%{width: 0; padding:0}
    /* 40%{width: 0; padding:0} */
    100%{width: 90vw; padding:10}
}
</style>
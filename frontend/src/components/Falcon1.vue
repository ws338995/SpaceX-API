<script setup>
import { ref, onMounted } from "vue";

import { userStore } from "../stores/user";
import Chip from "./Chip.vue";

const usr = userStore();

const props = defineProps({
  rocket: Object,
});

let activePayload = ref(false);
let activeStage1 = ref(false);
let activeStage2 = ref(false);
let activePropulsion = ref(false);

function selectPayload() {
  activePayload.value = !activePayload.value;
  activeStage1.value = false;
  activeStage2.value = false;
  activePropulsion.value = false;
}
function selectStage1() {
  activeStage1.value = !activeStage1.value;
  activePayload.value = false;
  activeStage2.value = false;
  activePropulsion.value = false;
}
function selectProp() {
  activePropulsion.value = !activePropulsion.value;
  activeStage2.value = false;
  activePayload.value = false;
  activeStage1.value = false;
}
</script>

<template>
  <div>
    <div>
      <svg
        ref="rocket"
        class="rocket"
        :class="{
          payloadSelected: activePayload,
          stage1Selected: activeStage1,
          propSelected: activePropulsion,
        }"
        viewBox="0 -3 120 530"
      >
        <g id="payload" class="selection" @click="selectPayload" :class="{shapeSelected: activePayload}">
          <path
            class="cls-1"
            d="M54.33,13.22A93.93,93.93,0,0,0,37,54.85V91l-1.93,10.22H73.89L71.67,90.56V53.22a84.16,84.16,0,0,0-7.11-23.55A84.16,84.16,0,0,0,54.33,13.22Z"
            transform="translate(-34.33 -12.4)"
          />
          <line class="cls-1" x1="2.67" y1="78.6" x2="37.33" y2="78.15" />
          <line class="cls-1" x1="20" y1="0.82" x2="20" y2="78.6" />
        </g>
        <g id="stage1_2" class="selection" @click="selectStage1" :class="{shapeSelected: activeStage1}">
          <polygon
            class="cls-1"
            points="0.74 88.82 39.55 88.82 39.55 418.15 0.74 418.15 0.74 198.6 0.74 88.82"
          />
          <line class="cls-1" x1="39.55" y1="198.6" x2="0.74" y2="198.6" />
          <line class="cls-1" x1="0.74" y1="125.86" x2="39.55" y2="125.86" />
        </g>
        <g id="prop" class="selection" @click="selectProp" :class="{shapeSelected: activePropulsion}">
          <polygon
            class="cls-1"
            points="0.74 418.15 39.55 418.15 28.44 446.15 28.44 450.9 24.15 460.08 31.85 481.71 8.59 481.71 16.44 460.52 11.85 451.04 11.85 445.86 0.74 418.15"
          />
          <polyline
            class="cls-1"
            points="28.44 446.15 20.15 446.01 11.85 445.86"
          />
          <polyline
            class="cls-1"
            points="39.55 418.15 20.15 434.45 20.15 446.01"
          />
          <line class="cls-1" x1="0.74" y1="418.15" x2="20.15" y2="434.45" />
        </g>
      </svg>
    </div>

    <div class="infoBox" v-if="activePayload">
      <div class="content">
        <h1 style="display: inline-block">Payload</h1>
        <div style="display: inline-block; float: right">
          <Chip
            v-if="props.rocket.second_stage.reusable"
            text="Reusable"
            color="green"
            outlined
          />
          <Chip v-else text="Non-Reusable" color="red" outlined />
        </div>
        <hr />
        <div class="content-text">
          <h3>Composite Fairing</h3>
          <p>
            Height:
            <b
              >{{
                props.rocket.second_stage.payloads.composite_fairing.height[
                  usr.getUnitsSize
                ]
              }}
              {{ usr.getUnitsSize }}</b
            >
          </p>
          <p>
            Diameter:
            <b
              >{{
                props.rocket.second_stage.payloads.composite_fairing.diameter[
                  usr.getUnitsSize
                ]
              }}
              {{ usr.getUnitsSize }}</b
            >
          </p>
        </div>
        <div class="content-text">
          <h3>Payload Weights Capacity</h3>
          <Chip
            v-for="pw in props.rocket.payload_weights"
            :key="pw.id"
            :text="
              pw.name + ': ' + pw[usr.getUnitsWeight] + ' ' + usr.getUnitsWeight
            "
            outlined
            color="white"
          />
        </div>
      </div>
    </div>

    <div class="infoBox" v-if="activeStage1">
      <div class="content">
        <h1 style="display: inline-block">First Stage</h1>
        <div style="display: inline-block; float: right">
          <Chip
            v-if="props.rocket.first_stage.reusable"
            text="Reusable"
            color="green"
            outlined
          />
          <Chip v-else text="Non-Reusable" color="red" outlined />
        </div>
        <hr />
        <div class="content-text">
          <h3>Trust</h3>
          <p>
            Thrust at Sea Level:
            <b
              >{{
                props.rocket.first_stage.thrust_sea_level[usr.getUnitsForce]
              }}
              {{ usr.getUnitsForce }}</b
            >
          </p>
          <p>
            Thrust in Vacuum:
            <b
              >{{
                props.rocket.first_stage.thrust_sea_level[usr.getUnitsForce]
              }}
              {{ usr.getUnitsForce }}</b
            >
          </p>
        </div>
        <hr />
        <div class="content-text">
          <h3>Information</h3>
          <p>
            Number of engines used:
            <b>{{ props.rocket.first_stage.engines }}</b>
          </p>
          <p>
            Amount of Fuel:
            <b>{{ props.rocket.first_stage.fuel_amount_tons }} tons</b>
          </p>
          <p>
            Burn Time:
            <b>{{ props.rocket.first_stage.burn_time_sec }} seconds</b>
          </p>
        </div>
      </div>
      <div class="content">
        <h1 style="display: inline-block">Second Stage</h1>
        <div style="display: inline-block; float: right">
          <Chip
            v-if="props.rocket.second_stage.reusable"
            text="Reusable"
            color="green"
            outlined
          />
          <Chip v-else text="Non-Reusable" color="red" outlined />
        </div>
        <hr />
        <div class="content-text">
          <h3>Information</h3>
          <p>
            Thrust:
            <b
              >{{ props.rocket.second_stage.thrust[usr.getUnitsForce] }}
              {{ usr.getUnitsForce }}</b
            >
          </p>
          <p>
            Number of engines used:
            <b>{{ props.rocket.second_stage.engines }}</b>
          </p>
          <p>
            Amount of Fuel:
            <b>{{ props.rocket.second_stage.fuel_amount_tons }} tons</b>
          </p>
          <p>
            Burn Time:
            <b>{{ props.rocket.second_stage.burn_time_sec }} seconds</b>
          </p>
        </div>
      </div>
    </div>

    <div class="infoBox" v-if="activePropulsion">
      <div class="content">
        <h2>Propulsion (Engines)</h2>
        <hr />
        <div class="content-text">
          <h3>Information</h3>
          <p>
            Total Number of Engines: <b>{{ props.rocket.engines.number }}</b>
          </p>
          <p>
            Type: <b>{{ props.rocket.engines.type }}</b>
          </p>
          <p>
            Layout: <b>{{ props.rocket.engines.layout }}</b>
          </p>
          <p>
            Max Engine Loos:
            <b>{{ props.rocket.engines.engine_loss_max }} engines</b>
          </p>
          <p>
            Thrust to Weight: <b>{{ props.rocket.engines.thrust_to_weight }}</b>
          </p>
        </div>
        <hr />
        <div class="content-text">
          <h3>Fuel Types</h3>
          <Chip
            v-if="props.rocket.engines.propellant_1"
            :text="props.rocket.engines.propellant_1"
            color="gray"
            style="display: inline-block; margin-right: 3px"
          />
          <Chip
            v-if="props.rocket.engines.propellant_2"
            :text="props.rocket.engines.propellant_2"
            color="gray"
            style="display: inline-block"
          />
        </div>
        <div class="content-text">
          <h3>Thrust</h3>
          <p>
            Thrust at Sea Level:
            <b
              >{{ props.rocket.engines.thrust_sea_level[usr.getUnitsForce] }}
              {{ usr.getUnitsForce }}</b
            >
          </p>
          <p>
            Thrust in a Vacuum:
            <b
              >{{ props.rocket.engines.thrust_vacuum[usr.getUnitsForce] }}
              {{ usr.getUnitsForce }}</b
            >
          </p>
          <p>
            Burn Time: <b>{{ props.rocket.engines.burn_time_sec }} seconds</b>
          </p>
        </div>
        <hr />
        <div class="content-text">
          <h3>ISP (Specific Impulse)</h3>
          <p>
            Sea Level: <b>{{ props.rocket.engines.isp.sea_level }} seconds</b>
          </p>
          <p>
            Vacuum: <b>{{ props.rocket.engines.isp.vacuum }} seconds</b>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cls-1,
.cls-2 {
  fill: rgba(255, 255, 255, 0);
  stroke: #a8a8a8;
  stroke-miterlimit: 10;
  transition: 0.1s;
}
.selection:hover * {
  fill: rgba(170, 120, 12, 0.3);
  cursor: pointer;
}
.cls-1 {
  stroke-width: 2px;
}
h3 {
  color: #464646;
}
.propSelected {
  width: 250px !important;
  height: 110vh !important;
  transform: translateY(-550px);
}
.stage1Selected {
  width: 400px !important;
  height: 110vh !important;
  transform: translateY(-90px);
}
.stage2Selected {
  width: 450px !important;
  height: 100vh !important;
  transform: translateY(-100px);
}
.payloadSelected {
  width: 450px !important;
  height: 250vh !important;
}
.shapeSelected *{
  fill: rgba(170, 120, 12, 0.7);
}
.rocket {
  width: 250px;
  height: 90vh;
  transition: 0.5s ease;
}
b {
  font-weight: 600;
}
.infoBox {
  overflow: hidden;
  position: absolute;
  max-width: 350px;
  /* max-height:fit-content; */
  border-left: 5px solid rgb(170, 120, 12);
  background-color: rgba(12, 12, 12, 0.9);
  box-shadow: 0 0 20px black;
  top: 20vh;
  left: 0;
  right: 0;
  padding: 10px;
  margin: auto;
  animation: text-box-open 2s ease;
}
.infoBox .content {
  width: 90vw;
  height: auto;
  overflow: hidden;
}
.content-text {
  margin: 10px 0;
}

@keyframes text-box-open {
  0% {
    width: 0;
    padding: 0;
  }
  /* 40%{width: 0; padding:0} */
  100% {
    width: 90vw;
    padding: 10;
  }
}
</style>
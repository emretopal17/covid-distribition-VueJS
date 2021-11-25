<template>
  <div class="container">
    <div class="input-group mb-3 mt-5 pt-3">
      <select
        v-model="selectedCountry"
        @change="getSelectedCountry"
        class="custom-select"
      >
        <option value="global">Global</option>
        <option
          v-for="country in countries"
          :value="country.Slug"
          :key="country.ISO2"
        >
          {{ country.Country }}
        </option>
      </select>
    </div>

    <div class="row justify-content-around mt-4">
      <div class="col-md-4">
        <div class="stats-item btn-info">
          <span class="item-title">Confirmed</span>
          <span class="item-count"> {{ confirmed | numberFormat }} </span>
        </div>
      </div>
      <div class="col-md-4">
        <div class="stats-item btn-danger">
          <span class="item-title">Deaths</span>
          <span class="item-count">{{ deaths | numberFormat }}</span>
        </div>
      </div>
      <div class="col-md-4">
        <div class="stats-item btn-success">
          <span class="item-title">Recovered</span>
          <span class="item-count">{{ recovered | numberFormat }}</span>
        </div>
      </div>
    </div>

    <component :is="tableType" :data="dataType"> </component>


  </div>
</template>

<script>
import axios from "axios";
import CountriesTable from "./components/CountriesTable"
import CountryTable from "./components/CountryTable"


export default {
  components: {
    CountriesTable,
    CountryTable,
  },
  data() {
    return {
      countries: {},
      selectedCountry: "global",
      data: {},
      confirmed: 0,
      deaths: 0,
      recovered: 0,
      countryData: {}
    };
  },
  // filters: {
  //   numberFormat(number) {
  //     return number.toLocaleString();
  //   },
  // },
  computed : {
    tableType(){
      return this.selectedCountry === 'global' ? CountriesTable : CountryTable;
    },
    dataType(){
      return this.selectedCountry === 'global' ? this.data : this.countryData;
    }
  },
  methods: {
    getCountries() {
      axios.get("https://api.covid19api.com/countries").then((response) => {
        this.countries = response.data;
      });
    },
    getGlobalVariable() {
      axios.get("https://api.covid19api.com/summary").then((response) => {
        const data = response.data;
        this.data = data.Countries;
        this.confirmed = data.Global.TotalConfirmed;
        this.deaths = data.Global.TotalDeaths;
        this.recovered = data.Global.TotalRecovered;
      });
    },
    getSelectedCountry() {
      let filtedData = "";
      if (this.selectedCountry == "global") {
        this.getGlobalVariable();
      } else {
        filtedData = this.data.find((country) => {
          return country.Slug === this.selectedCountry;
        });

      this.confirmed = filtedData.TotalConfirmed;
      this.deaths = filtedData.TotalDeaths;
      this.recovered = filtedData.TotalRecovered;
      }
      
      axios.get('https://api.covid19api.com/dayone/country/'+this.selectedCountry)
      .then(response => {
        console.log(this.countryData = response.data);
      })
      

      
    },
  },
  mounted() {
    this.getCountries();
    this.getGlobalVariable();
  },
};
</script>

<style>
body {
  background: antiquewhite;
}
.container {
  background-color: white;
  border-radius: 5px;
}
.stats-item {
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
}
.item-title {
  display: block;
  color: #fff;
  font-size: 17px;
}
.item-count {
  font-weight: bold;
  font-size: 30px;
}
</style>
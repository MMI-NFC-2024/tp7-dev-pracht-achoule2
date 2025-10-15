import * as Plot from "@observablehq/plot";
import populationMain from "../assets/penguins.json";

function setup() {
	const elmYear = document.getElementById("periode");
	const elmSex = document.getElementById("sexe");
	const elmAge = document.getElementById("age");
	const elmPlot = document.getElementById("plot");

	if (!elmYear || !elmSex || !elmAge || !elmPlot) {
		// Required elements not present — nothing to do.
		return;
	}

	function updatePlot() {
		const selectedYear = Number(elmYear.value);
		const selectedSex = elmSex.value;
		const selectedAge = Number(elmAge.value);

		const filteredData = populationMain.filter(d =>
			d.Période === selectedYear &&
			d.Sexe === selectedSex &&
			d.Age === selectedAge
		);

		const plot = Plot.plot({
			marks: [Plot.barY(filteredData, {x: "Region", y: "Population"})]
		});

		elmPlot.replaceChildren(plot);
	}

	elmYear.addEventListener("change", updatePlot);
	elmSex.addEventListener("change", updatePlot);
	elmAge.addEventListener("change", updatePlot);
	updatePlot();
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", setup);
} else {
	setup();
}


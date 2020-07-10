


// Global variables (Volume)

var volemia = 0;
var volemiaPorKg = 0;
var qtPlaquetasDesejadas = 0;
var qtDiferencaPlaquetas = 0;
var plaquetometria = 0;

// Global variables (Rendimento)

var qtDiferencaPlaRend = 0;
var volemiaRend = 0;
var tipoStandard = 0;
var tipoAferese = 0;
var tipoSOuA = 0;
var superficie = 0;




// Event Listeners (volume)

$("#plaque").keyup(function() {
	calculateAndShow();
});

$("#peso").keyup(function() {
	calculateAndShow();
});

$("#rendi").keyup(function() {
	calculateAndShow();
});

$('input:radio[name="personType"]').change(function() {
	if ($(this).is(':checked') && $(this).val() === 'homem'){
		volemiaPorKg = 75;
	} if ($(this).val() === 'mulher'){
		volemiaPorKg = 65;
	} if ($(this).val() === 'recem'){
		volemiaPorKg = 90;
	} if ($(this).val() === 'prema'){
		volemiaPorKg = 110;
	}
	calculateAndShow();
});

$('input:radio[name="transfusionType"]').change(function() {
	if ($(this).is(':checked') && $(this).val() === 'tera'){
		
		qtPlaquetasDesejadas = 100000; //terapeutica
	} if ($(this).val() === 'profi'){
		
		qtPlaquetasDesejadas = 50000; //profilatica
	}
	calculateAndShow();	
});

// check if premature or new-born

$('input:radio[name="personType"]').change(function() {
	if ($(this).is(':checked') && $(this).val() === 'recem'){
		$("#kilo").text("g");
	} if ($(this).val() === 'prema') {
		$("#kilo").text("g");
	} if ($(this).val() === 'homem') {
		$("#kilo").text("kg");
	} if ($(this).val() === 'mulher') {
		$("#kilo").text("kg");
	}

});




// Event Listener (Rendimento)

$("#plaquePre").keyup(function() {
	calculateAndDisplay();
});

$("#plaquePos").keyup(function() {
	calculateAndDisplay();
});

$("#weight").keyup(function() {
	calculateAndDisplay();
});

$("#height").keyup(function() {
	calculateAndDisplay();
});

$("#volume").keyup(function() {
	calculateAndDisplay();
});

$('input:radio[name="personTypeRend"]').change(function() {
	if ($(this).is(':checked') && $(this).val() === 'homem'){
		volemiaPorKg = 75;
	} if ($(this).val() === 'mulher'){
		volemiaPorKg = 65;
	} if ($(this).val() === 'recem'){
		volemiaPorKg = 90;
	} if ($(this).val() === 'prema'){
		volemiaPorKg = 110;
	}
	calculateAndDisplay();
});


$('input:radio[name="transfusionTypeRend"]').change(function() {
	if ($(this).is(':checked') && $(this).val() === 'standard'){
		
		tipoSOuA = 1000000000; //Standard
	} if ($(this).val() === 'aferese'){
		
		tipoSOuA = 1500000000; //Aférese
	}
	calculateAndDisplay();	
});

$('input:radio[name="personTypeRend"]').change(function() {
	if ($(this).is(':checked') && $(this).val() === 'recem'){
		$("#kilogram").text("g");
	} if ($(this).val() === 'prema') {
		$("#kilogram").text("g");
	} if ($(this).val() === 'homem') {
		$("#kilogram").text("kg");
	} if ($(this).val() === 'mulher') {
		$("#kilogram").text("kg");
	}

});



// Business Logic (Volume)

function calculateAndShow() {
	var plaquetometria = Number($("#plaque").val()) * 1000;
	var weight = Number($("#peso").val());
	var increment = Number($("#rendi").val()) / 100;

	qtDiferencaPlaquetas = qtPlaquetasDesejadas - plaquetometria;


	if($('#recem').is(':checked') || $('#prema').is(':checked')){
		weight = weight / 1000;
	}

	volemia = weight * volemiaPorKg;
	
	var kStandard = 1000000000 * increment;
	var kAferese = 1500000000 * increment;

	var temp = qtDiferencaPlaquetas * volemia * 1000;
	var finalStandard = temp / kStandard;
	var finalAferese = temp / kAferese;

	if(Number.isNaN(finalStandard)){
		$("#standardResult").text("Faltam Dados");
	} else {
		showStandard(finalStandard);
	}
	
	if(Number.isNaN(finalAferese)){
		$("#standardResult").text("Faltam Dados");
	} else {
		showAferese(finalAferese);
	}
	
}

function showStandard(value) {
	$("#standardResult").text(value.toFixed() + "ml");
}

function showAferese(value) {
	$("#afereseResult").text(value.toFixed() + "ml");
}





// Business Logic (Rendimento)

function calculateAndDisplay() {
	var plaquetometriaPre = Number($("#plaquePre").val());
	var plaquetometriaPos = Number($("#plaquePos").val());
	var volume = Number($("#volume").val());
	var weightRend = Number($("#weight").val());
	var height = Number($("#height").val());

	qtDiferencaPlaRend = (plaquetometriaPos - plaquetometriaPre) * 1000;

	if($('#recem').is(':checked') || $('#prema').is(':checked')){
		weightRend = weightRend / 1000;
		console.log("checked");
	}

	volemiaRend = weightRend * volemiaPorKg; 

	volume *= tipoSOuA;

	var rendimento = (qtDiferencaPlaRend * volemiaRend * 1000) / volume;

	superficie = 0.007184 * Math.pow(height, 0.725) * Math.pow(weightRend, 0.425);

	var cci = (qtDiferencaPlaRend * superficie) / (volume / 100000000000);
	var finalRendimento = rendimento * 100;
	// var finalCci = cci / 1000;
	var finalCci = 0;
	if($('#recem').is(':checked') || $('#prema').is(':checked')){
		finalCci = cci / 1000;
	} else {
		finalCci = cci / 1000;
	}
	

	if(Number.isFinite(finalRendimento)){
		showRendimento(finalRendimento);
	} else {
		$("#standardResult").text("Faltam Dados");
	}

	if(Number.isFinite(finalCci)){
		showCci(finalCci);
	} else {
		$("#cciResult").text("Faltam Dados");
	}

}

function showRendimento(value) {
	$("#rendimentoResult").text(value.toFixed() + "%");
}

function showCci(value) {
	$("#cciResult").text(value.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0] + "/L");
}







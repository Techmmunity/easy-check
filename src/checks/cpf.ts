// CPF validation according to Receita Federal
// More info: https://www.devmedia.com.br/validar-cpf-com-javascript/23916

import { makeFunction } from "../helpers/make-function";

const notCpf = [
	"00000000000",
	"11111111111",
	"22222222222",
	"33333333333",
	"44444444444",
	"55555555555",
	"66666666666",
	"77777777777",
	"88888888888",
	"99999999999",
];

const checkCPF = (cpf: string) => {
	let temp: string, count: number, total: number;

	if (notCpf.includes(cpf)) return false;

	temp = cpf.substr(0, 9);
	count = 10;
	total = 0;
	for (const number of temp) {
		total += parseInt(number, 10) * count;
		count--;
	}
	total = (total * 10) % 11;
	if (total > 9) total = 0;
	if (total.toString() !== cpf.charAt(9)) {
		return false;
	}

	temp = cpf.substr(0, 10);
	count = 11;
	total = 0;
	for (const number of temp) {
		total += parseInt(number, 10) * count;
		count--;
	}
	total = (total * 10) % 11;
	if (total > 9) total = 0;
	if (total.toString() !== cpf.charAt(10)) return false;

	return true;
};

const checkMaskedCPF = (maskedCPF: string) => {
	const MASKED_CPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

	if (MASKED_CPF.test(maskedCPF)) {
		return checkCPF(maskedCPF.replace(/\D/g, ""));
	}

	return false;
};

/**
 * Check if a string is a valid cpf
 * - 55357314047
 */
export const isCPF = makeFunction<string>({
	func: checkCPF,
});

/**
 * Check if a string is a valid maksed cpf
 * - 553.573.140-47
 */
export const isMaskedCPF = makeFunction<string>({
	func: checkMaskedCPF,
});

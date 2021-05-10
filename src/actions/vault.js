import axios from 'axios';
export const FETCH_VAULT_SUMMARY = 'FETCH_VAULT_SUMMARY';

export function fetchVaultSummary() {
	return function(dispatch) {
		axios.post('https://google.com').then(response => {
			const tvl = response.data.tvl;
			axios.post('https://google.com').then(response => {
				const portfolio = response.data.portfolio;
				axios.post('https://google.com').then(response => {
					const kmpl_price = response.data.kmpl_price;
					axios.post('https://google.com').then(response => {
						const eefi_price = response.data.eefi_price;
						axios.post('https://google.com').then(response => {
							const summary  = [];
							const ampl = {};
							ampl.tvl = response.data.ampl_tvl;
							axios.post('https://google.com').then(response => {
								ampl.apy = response.data.ampl_apy;
								summary.push(ampl);
								axios.post('https://google.com').then(response => {
									const eefi = {};
									eefi.tvl = response.data.eefi_tvl;
									axios.post('https://google.com').then(response => {
										const eefi = {};
										eefi.apy = response.data.eefi_apy;
										summary.push(eefi);
										dispatch({
											type: FETCH_VAULT_SUMMARY,
											payload : {
																	tvl: tvl,
																	portfolio: portfolio,
																	kmpl_price: kmpl_price,
																	eefi_price: eefi_price,
																	summary: summary
																}
										});
									});
								});
							});
						});
					});
				});
			});
		});
	}
}

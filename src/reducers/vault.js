import { FETCH_VAULT_SUMMARY } from '../actions/vault';

const defaultState = {
	tvl: 0,
	portfolio: 0,
	kmpl_price: 0,
	eefi_price: 0,
	summary: [{
		logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAJeUExURUxpcQAAAAAAAD8/PwAAAFVVVQAAAAAAAAAAAAAAAAAAAP///39/fwAAAA4ODgEBAQEBAQAAAP///wsLC////8bGxgoKCv///woKCg4ODgAAAA0NDQAAAExMTC4uLjMzMwoKChISEi0tLRQUFH9/f1ZWVkJCQjo6OhQUFCYmJhcXFw8PDw8PDwsLCwkJCUdHRyIiIgAAABkZGRAQEEhISFJSUhISEtfX1////zMzMxkZGUFBQSoqKg8PD0hISP///xUVFXt7eyEhISoqKhgYGCkpKR0dHR0dHQoKChAQEBQUFHFxcRoaGjg4OFlZWQkJCSQkJCIiIv///yUlJSUlJTIyMgsLCx0dHU1NTbS0tDAwMAoKChgYGBUVFQAAAAEBAQEBARISEnV1dTk5ORISEh8fHxMTE9DQ0EFBQQcHByUlJRwcHDk5OQ0NDRkZGQoKChISEgEBATk5OUlJSRgYGA8PD+Li4iYmJpubmxgYGBsbGzg4OA8PDw4ODh0dHRgYGFxcXAgICBwcHBEREZubmywsLCgoKKqqql1dXRcXFzAwMBoaGg4ODjMzMw0NDaWlpQsLCx4eHjU1NUNDQxAQEEdHRygoKA4ODhAQEAoKCnZ2diIiIjAwMDMzMzo6OikpKQ8PDxsbG0ZGRq+vr39/fxwcHFZWVhMTExISEggICB8fHwUFBb+/v2traw8PD6KiohEREQgICOXl5RYWFj09PRsbGyQkJBoaGgEBATw8PAwMDAICAiMjI2lpaSIiIgAAAAEBAQUFBQICAgQEBAgICAMDAwkJCQ0NDQYGBgcHB7CGDNAAAAC/dFJOUwD3/QQCA/4BAwT5AwL6yP78+wLWBBLKAfvH+MkGCpt31fRxxRovaFxxg8/Xxsg2TpT8y9M8PugNBU/cOoXJLgfWI5AGwoC/r/725BvERCj6XCwIlWZ+8pwuEYn9r8sH+vnrGlTsieYLPvyBs0f1ysnZ+1Uts+QJjBLHqFvx4JPNL/mg7hdbdwwmw1616QXwFPOyUVP3J3/G+/kcf2qqcW/DtzYgHMYs1NP1mfwUGsgW2fsKy0uuqq33WPn8hymLeTbbhQAAAhlJREFUWMPtVWVz3DAQXfscr3SXuzCnTVNmZkyZmZmZmSkpp8zMzMztygdp+6/qeOo2M/1QSzf95vfB49HM0+q93ScB+PDhwxMMTI6fJN3m16+VDJ9Do9K69lfdgMy2VA8MdT70HJSe3wBS1BXMF5pooqwBceF2fTW1C6FiLwJ4Kv6d9Kr2qhoY3Hh0RYTFWPtPBalwO//+rQsmLRijauG1xCW4Q0FrmZoGDN37cRevxjRRrqSBwU3reh4+OW5SxSaVTDB4mLgMxVBJwdhWCCjE6NjRBxfhCO6NFdJSBQ0cDkVPADNgzzYyl8+xeyKdg4PiJHK79BazMDoOZcc5BXbFD++3hQRwrhWkYdKR5LCRdlQrR5g8j/SRIyR3QNiw3lrkWMdhotCi/SUjyXFNdFW2k0IGw60wlWWjpIXraIlbtNcQyqjqIDXOqXBg9+K1vygc+ggtrbWUBg5naWcmug3pFm9DHTtJjDPiy+e0zy2J2LkrZVhdkEnE4LX14szvxnHoLjRzIMhs8MZ8FcI/QzVpqm5OGIqG57vwy0fxucbwGqHpFEyMh77eDLBP+o5iH6DYLWjMgCk0S5+dA8ybimdfrfef3j6usZIzLT08M21Ab0+v+ejN56kap1eMcnxn2KrfYGeFvjUtyTP+6V/LrNxzTyNFBSuzGju+M2jYLLegKBLp0bxFndqKN7zsi+birwVE8OHDh4//hp9kzYDsFysvpQAAAABJRU5ErkJggg==',
		vault_type: 'AMPL',
		deposit: 'AMPL',
		earn: 'EEFI, ETH',
		tvl: 0,
		apy: 0,
		balance: 0,
		wallet_balance: 0,
		withdraw_balance: 0
	},
	{
		logo: '/tables/media/new_ee_balancer.png',
		vault_type: 'EEFI/ETH <br> LP Tokens',
		deposit: 'EEFI/ETH LP Tokens',
		earn: 'EEFI, ETH',
		tvl: 0,
		apy: 0,
		balance: 0,
		wallet_balance: 0,
		withdraw_balance: 0
	},
	{
		logo: '/tables/media/kappa_logo_kmpl.png',
		vault_type: 'kMPL',
		deposit: 'kMPL Tokens',
		earn: 'Various Token Rewards',
		tvl: 0,
		apy: 0,
		balance: 0,
		wallet_balance: 0,
		withdraw_balance: 0
	},
	{
		logo: '/tables/media/apollo_cropped_edited_sm.png',
		vault_type: 'Pioneer <br> NFTs',
		deposit: 'Pioneer NFTs',
		earn: 'ETH',
		tvl: 0,
		apy: 0,
		balance: 0,
		wallet_balance: 0,
		withdraw_balance: 0
	}],
};

export default function VaultReducer(state = defaultState, action) {
  switch (action.type) {

    case FETCH_VAULT_SUMMARY:
      return Object.assign({}, state, {
        tvl: action.payload.tvl,
				portfolio: action.payload.portfolio,
				kmpl_price: action.payload.kmpl_price,
				eefi_price: action.payload.eefi_price,
				summary: action.payload.summary
      });
    default:
      return state;
  }
}

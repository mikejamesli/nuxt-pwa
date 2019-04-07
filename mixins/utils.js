export const utils = {
  isStandalone: function() {
    if (process.client) {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return true
      } else {
        return false
      }
    }
  },
  isIos: function() {
    if (process.client) {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    }
  },
  isOnline: function() {
    if (navigator.onLine) {
      return true
    } else {
      return false
    }
  },
  onShareClicked: function() {
    if (navigator.share) {
      navigator.share({
        title: 'The Tanya Star app',
        text: 'Check out the Tanya Star app!',
        url: 'https://tanyastar.netlify.com/'
      })
    } else {
      this.copyText('https://tanyastar.netlify.com/')
    }
  },
  copyText: function(string) {
    let textarea
    try {
      textarea = document.createElement('textarea')
      textarea.setAttribute('readonly', true)
      textarea.setAttribute('contenteditable', true)
      textarea.style.position = 'fixed' // prevent scroll from jumping to the bottom when focus is set.
      textarea.value = string

      document.body.appendChild(textarea)

      textarea.focus()
      textarea.select()

      const range = document.createRange()
      range.selectNodeContents(textarea)

      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)

      textarea.setSelectionRange(0, textarea.value.length)
      document.execCommand('copy')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      document.body.removeChild(textarea)
    }
  },
  canShow: function() {
    if (this.isStandAlone() && this.isIos()) {
      return false
    } else {
      return true
    }
  }
}
export default utils

const obj ={
  _http () {
    return new Promise((resolve, reject) => {
      this.http.post('').then(res => {
          if (res.code === '0000') {

          }
        }
      )
    })
  }
}


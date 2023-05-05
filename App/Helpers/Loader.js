export async function getContent(options){
    let { url, fetchOptions, successFn, errorFn} = options
    fetch(url, fetchOptions)
        .then(res => res.ok ? res : Promise.reject(res))
        .then(json => successFn(json))
        .catch(err => errorFn(err))
}
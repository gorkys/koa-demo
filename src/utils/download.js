/*
 Created by Gorky on 2018/10/17
*/
export default function download(url) {
  const a = document.createElement('a')
  a.href = url
  a.download = '未命名'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

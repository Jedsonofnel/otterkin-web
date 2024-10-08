export default function imagePreview(tree = document) {
  tree.querySelectorAll("[data-image-preview-form]").forEach((form) => {
    const imgInput = form.querySelector("[data-image-preview-input]")
    const imgTag = form.querySelector("[data-image-preview-img]")

    if (imgTag.src == "") {
      imgTag.hidden = true
    }

    function readFile(input = imgInput) {
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.readAsDataURL(input.files[0])
        reader.onload = () => {
          imgTag.setAttribute("src", reader.result)
          imgTag.hidden = false
        }
      }
    }

    imgInput.addEventListener("change", () => readFile())
  })
}

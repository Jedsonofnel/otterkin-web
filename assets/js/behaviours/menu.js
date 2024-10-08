export default function menu(tree = document) {
  tree.querySelectorAll("[data-menu-wrapper]").forEach((wrapper) => {
    // guard clause to prevent double registration
    if (wrapper.hasAttribute("data-menu-handled")) return

    wrapper.setAttribute("data-menu-handled", "")

    const button = wrapper.querySelector("[aria-haspopup=menu]"),
      menu = wrapper.querySelector("[role=menu]"),
      items = [...menu.querySelectorAll("[role=menuitem]")]

    const isOpen = () => !menu.hidden

    function toggleMenu(open = !isOpen()) {
      if (open) {
        menu.hidden = false
        button.setAttribute("aria-expanded", "true")
        items[0].focus()
      } else {
        menu.hidden = true
        button.setAttribute("aria-expanded", "false")
      }
    }

    // make it all non-tabbable so we can manage focus ourselves
    items.forEach((item) => {
      item.addEventListener("click", () => toggleMenu(false))
      item.setAttribute("tabindex", "-1")
    })

    toggleMenu(isOpen())
    button.addEventListener("click", () => toggleMenu())
    wrapper.addEventListener("blur", () => toggleMenu(false))

    // remove the menu on click in window
    window.addEventListener("click", function clickAway(event) {
      if (!wrapper.isConnected) window.removeEventListener("click", clickAway)
      if (!wrapper.contains(event.target)) toggleMenu(false)
    })

    // accessibility
    const currentIndex = () => {
      const idx = items.indexOf(document.activeElement)
      if (idx === -1) return 0
      return idx
    }

    menu.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        items[currentIndex() - 1]?.focus()
      } else if (e.key === "ArrowDown") {
        items[currentIndex() + 1]?.focus()
      } else if (e.key === "Space") {
        items[currentIndex()].click()
      } else if (e.key === "Home") {
        items[0].focus()
      } else if (e.key === "End") {
        items[items.length - 1].focus()
      } else if (e.key === "Escape") {
        toggleMenu(false)
        button.focus()
      }
    })
  })
}

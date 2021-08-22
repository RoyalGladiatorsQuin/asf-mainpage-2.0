export default function copy(text) {
    const fakeElem = document.body.appendChild(
        document.createElement("textarea")
    );
    fakeElem.style.position = "absolute";
    fakeElem.style.left = "-9999px";
    fakeElem.setAttribute("readonly", "");
    fakeElem.value = text;
    fakeElem.select();
    try {
        return document.execCommand("copy");
    } catch (err) {
        return false;
    } finally {
        fakeElem.parentNode.removeChild(fakeElem);
    }
}
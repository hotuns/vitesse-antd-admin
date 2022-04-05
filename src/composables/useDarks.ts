
const isDark = useDark()
const toggleDark = useToggle(isDark)

console.log(isDark)

export default () => ({ isDark, toggleDark })

# ISIS3710-ParcialPractico-202620
# Ana María Hernández Lasso - 202220870

# Revisión de Accesibilidad y Usabilidad

| # | Ubicación (archivo y línea) | Herramienta que lo detectó | Regla o principio incumplido | Por qué es un problema o caso específico | Corrección |
|---|---|---|---|---|---|

| 1 | en UserMenu.tsx en la línea 41| Lighthouse | Sale Buttons do not have an accessible name, se incumple el principio Perceptible de principios POUR de accesibilidad (la información debe ser perceptible con más de un sentido, en este caso solo con la vista pero ningún otro) | Es un problema porque una tecnología de asistencia se confundiría al leer el botón y no sabría cómo interprtarlo | Darle un aria-label con una descripción de que es un botón de "Salir de la sesión" |
| 2 |
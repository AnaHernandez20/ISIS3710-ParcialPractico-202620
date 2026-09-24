# ISIS3710-ParcialPractico-202620
# Ana María Hernández Lasso - 202220870

# Revisión de Accesibilidad y Usabilidad

| # | Ubicación (archivo y línea) | Herramienta que lo detectó | Regla o principio incumplido | Por qué es un problema o caso específico | Corrección |
|---|---|---|---|---|---|
| 1 | en UserMenu.tsx en la línea 41 | Lighthouse | Sale Buttons do not have an accessible name, se incumple el principio Perceptible de principios POUR de accesibilidad (la información debe ser perceptible con más de un sentido, en este caso solo con la vista pero ningún otro) | Es un problema porque una tecnología de asistencia se confundiría al leer el botón y no sabría cómo interprtarlo | Darle un aria-label con una descripción de que es un botón de "Salir de la sesión" |
| 2 | en page.tsx (el home de la aplicación) en todo el archivo porque hace falta un <main> | Lighthouse | Se incumple que la página sea Operable (principio POUR) pues no es fácilmente navegable | No es fácilmente navegable porque una tecnología de asistencia no comprendería cuál es el contenido principal de la página Document does not have a main landmark. | En lugar de usar un <div> genérico podríamos poner un <main> que indique cuál es el contenido principal (lo ponemos en el html)  |
| 3 | en page.tsx (el home de la aplicación) en la parte del html | Lighthouse | Sale <html> element does not have a [lang] attribute lo que quiere decir que no se especifica el idioma de la página, se incumple el principio Understandable de los principios POUR, pues la información no es del todo clara (no se sabe en qué idioma está) | Es un problema porque un lector de pantalla podría intentar interpretar o leer contenido que está en español pero con otro idioma | Debe especificarse el idioma con lang |
| 4 |  |  |  |  |  |
| 5 |  |  |  |  |  |
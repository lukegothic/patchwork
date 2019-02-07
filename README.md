# Patchweb
###### Réplica digital del juego de mesa "Patchwork", permite juego local y online
<hr />

## Mejoras sobre la version de tablero
* Automatización de procesos
    * Setup (mercado, tablero de tiempo)
    * Previsualización de estado futuro (tiempo y dinero) por pieza
    * Avance por indicador de tiempo y recogida de bonuses automática (pieza 1x1 y pago)
    * Recogida automática de bonus 7x7
* Ayuda visual a la hora de colocar piezas
* Nuevas opciones de juego
    * Tablero de tiempo
        * Modo clásico
        * Aleatorio
    * Piezas
        * Modo clásico
        * Aleatorio
    * Tamaño de tablero de jugador configurable
* Modos de juego
    * Juego en solitario contra IA
    * Juego online

## TODO
* Modelado de datos (BD,JSON,otros)
    * [x] Piezas
    * [x] Tablero de tiempo
* Modos de juego
    * [x] Hot-seat
    * [ ] vs IA
    * [ ] Multiplayer
* Mercado
    * [x] Generar orden mercado
    * [x] Gestion de compra
    * [ ] Preview tiempo y dinero
* Tablero de tiempo
    * [x] Generar tablero
* Colocar piezas en tablero
    * [x] Generar tablero
    * [ ] Colocacion de pieza comprada en tablero de jugador
    * [ ] Ayuda visual (incluido comprobacion de si se puede colocar o no)
    * [x] Calcular bonus 7x7
    * [ ] Descarte de piezas
* Piezas
    * [x] Modelado a través de vertices (1d => 2d)
    * [x] Rotar y Flip
* Game Loop
    * [x] Comenzar juego
    * [x] Finalizar juego
* UI - Pantalla config
    * [ ] Modo de juego
    * [ ] Opciones
* UI - Pantalla juego
    * [ ] Info de jugador
    * [ ] Tablero de jugador + alternar entre un jugador y otro
    * [ ] Mercado de piezas
    * [ ] Tablero de tiempo
* Juice it up
    * [ ] Juice it
    * [ ] More juice
    * [ ] Best juice
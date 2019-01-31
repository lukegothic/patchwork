<h1>Patchweb</h1>
<h4>Réplica digital del juego de mesa "Patchwork", permite juego local y online</h4>
<hr />

<h2>Mejoras sobre la version de tablero</h2>
<ul>
    <li>Automatización de procesos
        <ul>
            <li>Setup (mercado, tablero de tiempo)</li>
            <li>Previsualización de estado futuro (tiempo y dinero) por pieza</li>
            <li>Avance por indicador de tiempo y recogida de bonuses automática (pieza 1x1 y pago)</li>
            <li>Recogida automática de bonus 7x7</li>
        </ul>
    </li>
    <li>Ayuda visual a la hora de colocar piezas</li>
    <li>Nuevas opciones de juego
        <ul>
            <li>Tablero de tiempo
                <ul>
                    <li>Modo clásico</li>
                    <li>Aleatorio</li>
                </ul>
            </li>
            <li>Piezas
                <ul>
                    <li>Modo clásico</li>
                    <li>Aleatorio</li>
                </ul>
            </li>
            <li>Tamaño de tablero de jugador</li>
        </ul>
    </li>
    <li>Modos de juego
        <ul>
            <li>Juego en solitario contra IA</li>
            <li>Juego online</li>
        </ul>
    <li>
</ul>

##TODO
* Modelado de datos (BD,JSON,otros)
* [x] Piezas
* [x] Tablero de tiempo
* Modos de juego
* [ ] Hot-seat
* [ ] vs IA
* [ ] Multiplayer
* Mercado
* [x] Generar orden mercado
* [x] Gestion de compra
* [ ] Preview tiempo y dinero
* Tablero de tiempo
* [x] Generar tablero
* Colocar piezas en tablero
* [ ] Colocacion de pieza en tablero de jugador
* [ ] Ayuda visual
* Piezas
* [x] Modelado a través de vertices (1d => 2d)
* [ ] Rotar y Flip
* [ ] Calcular bonus 7x7
* Game Loop
* [x] Comenzar juego
* [ ] Finalizar juego
* UI
    * Pantalla de configuracion
    * [ ] Modo de juego
    * [ ] Opciones
    * Pantalla de juego
    * [ ] Info de jugador
    * [ ] Tablero de jugador + alternar entre un jugador y otro
    * [ ] Mercado de piezas
    * [ ] Tablero de tiempo
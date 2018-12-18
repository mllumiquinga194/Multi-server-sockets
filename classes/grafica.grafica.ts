export class GraficaData{

    private meses: string[] = ['enero', 'febrero', 'marzo', 'abril'];
    private valores: number[] = [1, 2, 3, 4];

    constructor(){}

    //Para odtener los valores de la grafica
    getDataGrafica(){
        return [
            { data: this.valores, label: 'Ventas' }
        ];
    }

    //Incrementa un valor de la grafica
    incrementarValor( mes: string, valor: number ){

        mes = mes.toLowerCase().trim();

        for( let i in this.meses ){

            if( this.meses[i] === mes ){
                this.valores[i] += valor;
            }
        } 

        return this.getDataGrafica();
    }
}
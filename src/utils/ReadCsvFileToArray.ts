const ReadCsvFileToArray = (csvFile: string) => {

    const {load} = require('csv-load-sync');
    function split(line: any, lineNumber: any) {  // ajusta os dados
        if (lineNumber === 0) { // cabeçalho
            return line.split(',')
        }
        const result: any[] = [];
        const parts = line.split(',')  // transforma em partes
        let i = 0;                     
        while( i < parts.length){       // ajusta as partes com os dados
            if(i === 0){  // primeira parte (id)
                result.push(parts[0])
                i++
            }
            if(i === (parts.length - 2)){   // penultima parte (price)
                result.push(parts[i])
                i++
            }
            if(i === (parts.length - 1)){    // ultima parte (qty_stock)
                result.push(parts[i])
                i++
            }
            if((0 < i) && ( i <= (parts.length - 3))){   // a parte que ficou entre a primeira
                let textAux = ""                         // e a penultima parte
                let x = i
                while(x <= (parts.length - 3)){
                    textAux = textAux + parts[x] + ',';
                    x++;
                }
                textAux = textAux.substr(0, textAux.length - 1)
                i = x;
                result.push(textAux)
            }
        }

        return result;
    }
    const result = load(csvFile, {
        getColumns: split
        });
    return result
}

export default ReadCsvFileToArray;
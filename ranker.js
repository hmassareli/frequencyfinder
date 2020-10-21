var arrayRank = rank.split(" ");
		var terminou = 0;
		var arrayResults = [];
		var file;// criei o file aqui pra ele ser global
		function isNumeric(value) {
    		return /^-{0,1}\d+$/.test(value);
		}
		function onChange(input){

			file = input.target.files; // executa a função getfile
			//var lengthFiles = file.length;  
			console.log(file[0].name);
			var txts = [];
			for (let i = 0 ; i <= file.length - 1; i++) {
				let reader = new FileReader();
				//console.log(txts);
				
				reader.onload = function(event) {
					txts[i] =(event.target.result);
  					  	// O arquivo de texto será impresso aqui
  					  	//console.log(i + ") " + txts[i]);
    					separar(i,txts);
  				};
  				reader.readAsText(file[i]);
  				
  			}
			
			
		} 
		function separar(nFile,txts){

		//console.log("entrou sua budega"+ nFile + " " + txts[nFile]);
		//var textolimpo = cleanText(arquivo.texto);
		var arrayUtil = [];
		var i = 0;
		var j = 0;
		arrayLinhas = txts[nFile].split("\n");
		linha = 0;
		var isLastLineEmpty = false; // isso aqui vou usar para evitar que passem 2 linhas empty e que o "i" seja pulado por isso
		while(linha < arrayLinhas.length){

			//console.log(isNumeric(arrayLinhas[linha]) + " "+ arrayLinhas[linha]);
			if((arrayLinhas[linha].length > 1) || (arrayLinhas[linha].length == 1 && isNumeric(arrayLinhas[linha])) ){ // Quero fazer isso para ele só entrar caso não seja uma linha vazia, mas tive que colocar duas opções porque as vezes uma linha vazia significa length = 1, e as vezes a linha fazia tem length = 0, por isso usei uma função pra só entrar caso seja length 1 && seja um valor numérico(criei função manualmente com regExṕ), dessa forma ele só vai entrar no else e iterar o "i" caso seja literalmente um espaço vazio(criando assim outra posição no array pra essa frase)
				isLastLineEmpty = false; //(ver declaração da variavel)
				if(j != 0){// se não estivermos no numerinho do começo
					if(j>2){arrayUtil[i][1]+= (" " + arrayLinhas[linha]);// se tivermos duas linhas com falas, isso vai mandar pra msm posição do array, porque eu quero que todas as falas estejam em uma só posição, a posição arrayUtil[i][1]
					}
					else if(j == 1){
						arrayUtil[i] = [];
						arrayUtil[i][j-1] = arrayLinhas[linha];

					}else{
						arrayUtil[i][j-1] = arrayLinhas[linha];
					}


					// o a linha vai ir pro arrayUtil
				

				}
				
				

			 j++;
			}else{// Caso o espaço que estamos é um espaço vazio, vamos criar uma nova posição do array pra começar a abastecer uma nova linha com falas
			
				if(isLastLineEmpty == false){// isso evita que ele aumente o "i" duas vezes quando tem varias linhas empty, só aumentará caso a última linha não tenha sido também empty
						console.log(i + " é indefinido"+ arrayLinhas[linha].length); 
						i++;
						j=0;
					}
				
				isLastLineEmpty = true;
			}
			linha++;
			if(linha >= arrayLinhas.length){
				console.log(arrayUtil);
				classificar(nFile,arrayUtil);
			}
		}
		
	
		}// termina função SEPARAR

		function classificar(nFile, arrayUtil){
			// Aqui vou colocar a primeira posição como essa budega
			var jaTerminou = false;
			var fileName = file[nFile].name; 
			arrayResults[nFile] = [];
			//alert("nome da bagaça" + fileName);
			var start = Number($("#range").val());
			var end = Number($("#range2").val());
			if((start.length == 0 )|| (end.length == 0)){ //Se a pessoa não tiver colocado o range nos inputs
				alert("escreva qual é o intervalo de busca meu filho, colabora!");
			}
			else{//Se a pessoa tiver colocado o range:
				console.log("range de busca "+ typeof start + " " + typeof end);
				var filtro = /([A-z])|'\b/g;
				//arrayWords[i] = arrayWords[i].match(filtro);
				var bloco = 0;
				var tamBloco = Number($("#tamTrecho").val());
				for(let i = 0; i < arrayUtil.length; i++){
					if(arrayUtil[i] == undefined){
						//console.log(i + " é indefinido"); 
					}
					if(arrayUtil[i][1] == undefined){
						console.log("a posição " + i + "é undefined");
						arrayUtil[i][1] = "asdasd";
					}
						arrayUtil[i][1] = arrayUtil[i][1].split(" ");
						for(let j = 0; j < arrayUtil[i][1].length;j++){
							arrayUtil[i][1][j] = arrayUtil[i][1][j].match(filtro);// vai rodar por todas as linhas filtrando as palavras
							//console.log(arrayUtil[i][1][j]);
							if(Array.isArray(arrayUtil[i][1][j])){
								arrayUtil[i][1][j] = arrayUtil[i][1][j].join('');// confere se as palavras estão em array
								//console.log("array com join:"+ arrayUtil[i][1] );
							}
						}
						
					
				}
				
				var iteradorResults = 0;
				for(let i = 0; i < arrayUtil.length; i+=10){//cada linha i é uma linha do arrayUtil que percorre
					
					var match = 0;// vai guardar a quantidade matches que o negocio tem 
					if((arrayUtil.length - i )> tamBloco){
							arrayResults[nFile][iteradorResults] = { 	//MEU PRIMEIRO OBJETINHO BONITINHOOO
								arquivo: fileName,
								tempo: arrayUtil[i][0].split("-->")[0] + "-->" + arrayUtil[i+(tamBloco-1)][0].split("-->")[1],
								matches: 0

							};
						
						for(let j = 0; j < tamBloco; j++){// rodar num bloco tamanho padrão
							
							for(let k = 0; k < arrayUtil[j+i][1].length; k++){// roda em cada palavra da linha em questao
								//console.log(arrayUtil[j+i]);
								if(arrayUtil[j+ i][1][k] != null){// isso evita que o negócio prossiga quando a palavra é null
									
								
									
									//console.log(Number(start)<Number(end));
									for(let nrank = start; nrank <= end; nrank++){// vai rodar no rank pra buscar matches
										
										
										if(arrayRank[nrank].toLowerCase() == arrayUtil[j+ i][1][k].toLowerCase()){
											//console.log(arrayUtil[j + i][1][k] + " em  " + arrayUtil[j + i][1] + " " + (i+j));
											arrayResults[nFile][iteradorResults].matches++;

										}
									}
								}	
							}

						}

						iteradorResults++;
					} else{ //((arrayUtil.length - i )== tamBloco){// entrará sempre que tiver terminado a criação dos objetos por blocos, para cada arquivo
						if(!jaTerminou){// jaTerminou vai impedir que a variavel terminou conte mais que uma vez por arquivo, pois as vezes a condição else é acionada mais que uma vez no mesmo arquivo 
						terminou ++;
						console.log("chegou no final das budeguinha" + terminou);
						console.log(arrayResults);
						jaTerminou = true;
							
							if(terminou == file.length){// isso aqui vai ver se finalmente terminou de executar de classificar todos os arrays de todos os arquivos para então começar o rankeamento geral!
								console.log( i + " " + arrayUtil.length + "CHEGOU NO FINAL DA FORMAÇÃO DOS BLOCOS" + terminou);
								rankear();
							}
						
						}
						
						
						// aqui vai criar um bloco menorzin pra ajustar 
					}



				}
				

				
			}//fim do else
			

		}
		function rankear(){// uma função cuja função é rankear
			let tamRanking = Number($("#qtdRank").val()) ;

			let melhoresMatches = arrayResults[0].slice(0,tamRanking );
			//alert(arrayResults[0].length);
			arrayResults[0] = arrayResults[0].slice(tamRanking,arrayResults[0].length);//Depois que populei meu melhores matches com as n primeiras do arrayResults, devo tirar tais posições daí para evitar que hajam repetições no resultado
			//alert(arrayResults[0].length);
			//console.log("olha só");
			
			console.log ( " melhores matches[0] é " + melhoresMatches[0].matches);
			
			for (let i = 0; i <= tamRanking - 1; i++){// isso aqui eu só to preparando as primeiras posições do arrayResults para servirem como base para eu preencher com os melhores matches depois
				for(let j = 0; j < tamRanking - 1; j++){
					
					if(melhoresMatches[j].matches < melhoresMatches[j+1].matches ){ 
						[melhoresMatches[j],melhoresMatches[j+1]] = [melhoresMatches[j+1],melhoresMatches[j]];
					}
				}
				
			}
			//alert(melhoresMatches[0].matches);
			var lengthResults = arrayResults.length;
			for (let i = 0; i <= lengthResults - 1; i++) {// percorrer as arrays correspondentes a cada arquivo
				for (let j = 0; j <= arrayResults[i].length - 1; j++) {//vai percorrer todos os trechos
				var aux = [];
				var trocou = false;
					for (let k = 0; k < melhoresMatches.length; k++) {// vai percorrer a tabela com os n melhores para comparar
						if(trocou == false){// aqui vai repetir enquanto não tiver encontrado um maior q os melhores que possa ser trocado
							if(arrayResults[i][j].matches > melhoresMatches[k].matches){
								aux = melhoresMatches[k];// o aux vai guardar pra depois ir empurrando os posteriores da fila
								melhoresMatches[k] = arrayResults[i][j];// agora o rank naquela posição recebeu trecho melhor que o atual
								trocou = true;
							}
						}
						else{//caso já tiver trocado alguma lá em cima, as demais só vão sendo empurradas pra baixo
							[aux,melhoresMatches[k]] = [melhoresMatches[k],aux];
							//[aux, arrayResults[i][j]] = [arrayResults[i][j],aux]; -- esse tinha sido um erro
						}
					}
				}
			}
			//alert(melhoresMatches[0].matches);
console.log(melhoresMatches);
var lengthinho = melhoresMatches.length;
var linhaImpressa = "";
			for (let i  = 0; i<= lengthinho - 1;  i++) {
				linhaImpressa = "<tr><td>"+melhoresMatches[i].arquivo + "</td><td>"+melhoresMatches[i].tempo + "</td><td>"+melhoresMatches[i].matches+"</td><td>Coming Soon</td></tr>";
				$('.tabelaResultados').append(linhaImpressa);
			}
		}

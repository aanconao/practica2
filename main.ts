
//Practica realizada por Alan Fernando Ancona y Juan Manuel Munoz

const developerJokes = [ "¿Por qué los desarrolladores odian la naturaleza? Porque tiene demasiados bugs.", "Un SQL entra en un bar, se acerca a dos mesas y pregunta: '¿Puedo unirme?'", "¡He terminado mi código a tiempo! – Nadie, nunca.", "Si no funciona, añade más `console.log()`.", "¿Cuántos programadores se necesitan para cambiar una bombilla? Ninguno, es un problema de hardware.", "No me asusto fácilmente... excepto cuando veo código sin `;` al final.", "Los desarrolladores no envejecen, solo se depuran.", "El único lugar donde puedes escapar de una excepción es en Java.", "Frontend sin diseño es como un backend sin lógica.", "¿Por qué los programadores prefieren el té? Porque en Java no hay café.", "Hay 10 tipos de personas en el mundo: las que entienden binario y las que no.", "Siempre prueba tu código... excepto cuando funciona.", "Tu código no está roto, solo es 'funcionalidad no documentada'.", "En qué se parecen los programadores y los gatos? En que odian mojarse y no pueden dejar de jugar con cosas que no deberían.", "Mi código funciona... hasta que lo toco de nuevo.", "¿Por qué los desarrolladores odian la luz del sol? Porque depuran en la oscuridad.", "Cuando crees que has eliminado todos los bugs, aparece el 'bug final'.", "Git es como un horóscopo: nunca entiendes los conflictos.", "Un desarrollador sin bugs es como un unicornio, no existe.", "En mi máquina funciona... pero no en producción." ];

const handler = async (req: Request): Promise<Response> => {

  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;
  

  if (method === "GET") {

    if (path === "/jokes") {
      
     const randome= Math.floor(Math.random()*developerJokes.length);

     const num= url.searchParams.get("index");

     if(!num)return new Response(JSON.stringify(developerJokes[randome]));

     return new Response(JSON.stringify(developerJokes[Number(num)]));
     
    }

    if(path == "/calcular"){
      const num1= url.searchParams.get("num1");
      const num2= url.searchParams.get("num2");
      const operacion= url.searchParams.get("operacion");

      if(operacion==="suma"){
        return new Response(JSON.stringify(Number(num1)+Number(num2))  );
      }else if(operacion==="resta"){
        return new Response(JSON.stringify(Number(num1)-Number(num2))  );
      }else if(operacion==="division"){
        if(num2==='0'){
          return new Response("Error: No se puede dividir por 0");
        }
        return new Response(JSON.stringify(Number(num1)/Number(num2))  );
      }else if(operacion==="multiplicacion"){
        return new Response(JSON.stringify(Number(num1)*Number(num2))  );
      }

    }


    if (path.startsWith("/reverse")){
      const frase : string  = path.split('/').at(2);
      const f = frase.split('').reverse().join('').replaceAll('02%',' ');
      const detalles= url.searchParams.get("detalles");

      if(detalles==="true"){
        return new Response(JSON.stringify("Reverso:"+f+" longitud: "+f.length) );
      }

      return new Response(JSON.stringify(f) );

    }

  } 
  return new Response("endpoint not found", { status: 404 });
};

Deno.serve({ port: 3000 }, handler);

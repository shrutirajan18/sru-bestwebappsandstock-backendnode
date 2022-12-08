const http = require('http');
const path = require('path');
const fs= require('fs');

const server = http.createServer((req, res)=>
{
    if (req.url==='/api')
    {
        fs.readFile
        (
            path.join(__dirname, 'public', 'db.json'),'utf-8',(err, content) => 
            {
                                    
                                    if (err) throw err;
                                    // Please note the content-type here is application/json
                                    res.setHeader("Access-Control-Allow-Origin", "*") ;
                                    res.writeHead(200, { 'Content-Type': 'application/json' });
                                    res.end(content);
            }
              );
    }
    else
    {
        let filePath= path.join(__dirname, 'public', req.url==='/' ? 'index.html':req.url );
        let extname = path.extname(filePath)
        switch(extname)
        {
            case '.css':
                contentType= 'text/css';
                break;
            
            case '.html':
                    contentType= 'text/html';
                    break
            case '.json':
                    contentType= 'application/json';
                    break
        }
        fs.readFile(filePath, (err, content)=>
        {
            if(err) 
            {
               
                    fs.readFile(path.join(__dirname,'public','404.html'),(err,content)=>
                    {
                        res.setHeader("Access-Control-Allow-Origin", '*');
                        res.writeHead(200, {"Content-Type": 'text/html'});
                        res.end(content, 'utf-8')
                    });
                            
            }
            else
            {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200, {'Content-Type':contentType});
                res.end(content, 'utf-8');
            }
        });
    }
});

const PORT = process.env.PORT || 5959;
server.listen(PORT,()=>console.log(`Great our server is working ${PORT}`))
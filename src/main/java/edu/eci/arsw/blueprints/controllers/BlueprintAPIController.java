package edu.eci.arsw.blueprints.controllers;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.google.gson.Gson;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.service.BlueprintsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping(value = "/blueprints")
public class BlueprintAPIController {
    @Autowired
    BlueprintsServices blueprintsServices;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getBluePrint() {
        try {
            String json = new Gson().toJson(blueprintsServices.getAllBlueprints());

            return new ResponseEntity<>(json, HttpStatus.ACCEPTED);
        } catch (BlueprintPersistenceException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error en el metodo getAllBluePrints", HttpStatus.NOT_FOUND);
        } catch (BlueprintNotFoundException e) {
            throw new RuntimeException(e);
        }
    }


    @RequestMapping(path = "/{author}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getBlueprintByAuthor(@PathVariable String author) {
        try {
            String json = new Gson().toJson(blueprintsServices.getBlueprintsByAuthor(author));
            return new ResponseEntity<>(json, HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error, No se encontro el Autor", HttpStatus.NOT_FOUND);
        } catch (BlueprintPersistenceException e) {
            throw new RuntimeException(e);
        }
    }

    @RequestMapping(path = "/{author}/{bpname}" , method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getBlueprintByAuthorName(@PathVariable String author, @PathVariable String bpname) {
        try {
            String json = new Gson().toJson(blueprintsServices.getBlueprint(author, bpname));
            return new ResponseEntity<>(json, HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error, No se encontro el Autor o el plano", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postBlueprint(@RequestBody Blueprint blueprint) {
        try {
            blueprintsServices.addNewBlueprint(blueprint);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BlueprintPersistenceException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("No se pudo Añadir el plano",HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(path = "/{author}/{bpname}",method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> putBlueprint(@PathVariable String author, @PathVariable String bpname, @RequestBody Blueprint blueprint) {
        try {
            blueprintsServices.updateBlueprint(author, bpname, (List<Point>) blueprint);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>( "No se pudo actualizar el plano", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "/{author}/{bpname}", method = RequestMethod.DELETE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteBlueprint(@PathVariable String author, @PathVariable String bpname) throws BlueprintNotFoundException {
        blueprintsServices.deleteBlueprint(author, bpname);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


}


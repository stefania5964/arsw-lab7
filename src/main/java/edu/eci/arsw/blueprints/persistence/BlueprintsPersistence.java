package edu.eci.arsw.blueprints.persistence;
import edu.eci.arsw.blueprints.model.Blueprint;

import java.util.Set;
public interface BlueprintsPersistence {

    /**
     * save blueprint in our set
     * @param bp the new blueprint
     * @throws BlueprintPersistenceException
     */
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException;


    /**
     * return the blueprint of the given name and author
     * @param author
     * @param bprintname
     * @throws BlueprintNotFoundException
     */
    public Blueprint getBlueprint(String author,String bprintname) throws BlueprintNotFoundException;

    /**
     * Update Blueprint
     * @param author blueprint's author
     * @param bprintname blueprint's author
     * @param bp the new blueprint
     * @throws BlueprintPersistenceException
     */
    public void updateBlueprint(String author,String bprintname, Blueprint bp) throws BlueprintPersistenceException, BlueprintNotFoundException;


    /**
     *return the set of blueprints
     * @throws BlueprintPersistenceException
     */
    public Set<Blueprint> getBluePrints() throws BlueprintPersistenceException, BlueprintNotFoundException;
    /**
     * Return the blueprints created for an author
     * @param author
     * @throws BlueprintNotFoundException
     */
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws  BlueprintNotFoundException;


    /**
     * Delete Blueprint
     * @param author name author
     * @param bpname name blueprint
     */
    public void deleteBlueprint(String author, String bpname);
}

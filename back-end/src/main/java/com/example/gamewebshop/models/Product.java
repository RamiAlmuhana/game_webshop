package com.example.gamewebshop.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Product {
    @Id
    @GeneratedValue
    private long id;
    private String name;
    @Column(length = 500)
    private String description;
    private Number price;
    private String imgURL;
    private int voorraad;
    private String type;

    /*
   Maps the many-to-one relationship between product and category, jsonbackreference so that we do not get an
   infinite dependency loop in the request. Cascasdetype merge so the product is able to create a category if we
   seed the data to the database. Without the merge you get a persistence race condition.
   */
    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference
    private Category category;





    //needed by JPA to create the entity must be present no arg constructor
    public Product() {
    }

    public Product(String name, String description, Number price, String imgURL, int voorraad, Category category, String type) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imgURL = imgURL;
        this.voorraad = voorraad;
        this.category = category;
        this.type = type;
    }

//getters and setters are needed to map all the properties to the database by JPA, could
    //also be solved by making the properties public but gives less control over the properties.


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Number getPrice() {
        return price;
    }

    public void setPrice(Number price) {
        this.price = price;
    }

    public String getImgURL() {
        return imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }

    public int getVoorraad() {
        return voorraad;
    }

    public void setVoorraad(int voorraad) {
        this.voorraad = voorraad;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getType() {
        return type;
    }

    public void setType(String genre) {
        this.type = genre;
    }
}

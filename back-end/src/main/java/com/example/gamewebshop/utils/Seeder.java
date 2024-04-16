package com.example.gamewebshop.utils;

import com.example.gamewebshop.dao.OrderDAO;
import com.example.gamewebshop.dao.ProductDAO;
import com.example.gamewebshop.dao.GamesRepository;
import com.example.gamewebshop.dao.UserRepository;
import com.example.gamewebshop.models.Category;
import com.example.gamewebshop.models.CustomUser;
import com.example.gamewebshop.models.Product;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class Seeder {
    private ProductDAO productDAO;
    private UserRepository userRepository;
    private OrderDAO orderDAO;
    private GamesRepository gamesRepository;


    public Seeder(ProductDAO productDAO, UserRepository userRepository, OrderDAO orderDAO, GamesRepository gamesRepository) {
        this.productDAO = productDAO;
        this.userRepository = userRepository;
        this.orderDAO = orderDAO;
        this.gamesRepository = gamesRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event){
        this.seedProducts();
        this.seedUser();
    }

    private void seedProducts(){
        Category games = new Category("games");
        Product rainbowSixSiege = new Product(
                "Tom Clancy's Rainbow Six Siege",
                "Tom Clancy's Rainbow Six® Siege is an elite, tactical team-based shooter where superior planning and execution triumph.",
                15.99,
                "https://store.ubisoft.com/on/demandware.static/-/Sites-masterCatalog/default/dw63e24d90/images/large/56c494ad88a7e300458b4d5a.jpg",
                2,
                games,
                "games");
        Product mortalKombar1 = new Product(
                "Mortal Kombat 1",
                "Discover a reborn Mortal Kombat™ Universe created by the Fire God Liu Kang. Mortal Kombat™ 1 ushers in a new era of the iconic franchise with a new fighting system, game modes, and fatalities!",
                34.99,
                "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSAMOK3cjH0oK89AraaQ_DJQ3EyioLRJxCnq0X2lLPXDisjyn1XOuwGkRLht5b1c7d7G6Uk2w",
                2,
                games,
                 "games");
        Product eldenRing = new Product(
                "Elden Ring",
                "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
                47.99,
                "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg",
                2,
                games,
                 "games");
        Product helldivers2 = new Product(
                "Helldivers 2",
                "The Galaxy’s Last Line of Offence. Enlist in the Helldivers and join the fight for freedom across a hostile galaxy in a fast, frantic, and ferocious third-person shooter.",
                39.99,
                "https://image.api.playstation.com/vulcan/ap/rnd/202309/0718/60ebb0f1f65149baa3c3ea07b08f8595c17e7759fea79e1c.jpg",
                2,
                games,
                "games");
        Product codmw3 = new Product(
                "Call of Duty®: Modern Warfare® III",
                "In the direct sequel to the record-breaking Call of Duty®: Modern Warfare® II, Captain Price and Task Force 141 face off against the ultimate threat.",
                69.99,
                "https://m.media-amazon.com/images/M/MV5BYmNjZDM0M2EtZTFiYy00YjJlLWIzNDUtNjhhMjk2ODNkYzFlXkEyXkFqcGdeQXVyMTcyNjA2NzMx._V1_FMjpg_UX1000_.jpg",
                2,
                games,
                "games");

        this.productDAO.createProduct(rainbowSixSiege);
        this.productDAO.createProduct(mortalKombar1);
        this.productDAO.createProduct(eldenRing);
        this.productDAO.createProduct(helldivers2);
        this.productDAO.createProduct(codmw3);
    }

    private void seedUser(){
        CustomUser customUser = new CustomUser();
        customUser.setName("Rami");
        customUser.setInfix("");
        customUser.setLastName("Al-Muhana");
        customUser.setEmail("test@mail.com");
        customUser.setPassword(new BCryptPasswordEncoder().encode("Test123!"));
        userRepository.save(customUser);
    }

    private void seedUser1(){
        CustomUser customUser = new CustomUser();
        customUser.setName("Rami");
        customUser.setInfix("");
        customUser.setLastName("Al-Muhana");
        customUser.setEmail("test@mail.com");
        customUser.setPassword(new BCryptPasswordEncoder().encode("Test123!"));
        userRepository.save(customUser);
    }
}

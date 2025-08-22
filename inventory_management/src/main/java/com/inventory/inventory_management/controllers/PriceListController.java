package com.inventory.inventory_management.controllers;

import com.inventory.inventory_management.dto.DefaultResponse;
import com.inventory.inventory_management.dto.PriceListDto;
import com.inventory.inventory_management.entities.PriceList;
import com.inventory.inventory_management.services.PriceListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/price-lists")
public class PriceListController {

    private final PriceListService priceListService;

    public PriceListController(PriceListService priceListService) {
        this.priceListService = priceListService;
    }

    @PostMapping
    public ResponseEntity<?> createPriceList(@RequestBody PriceList priceList) {
        return priceListService.createPriceList(priceList);
    }

    @GetMapping
    public List<PriceListDto> getAllPriceLists() {
        return priceListService.getAllPriceLists();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPriceListById(@PathVariable Long id) {
        return priceListService.getPriceListById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).body(
                    new DefaultResponse("Id not found", false)
                ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updatePriceList(@PathVariable Long id, @RequestBody PriceList priceList) {
        return priceListService.updatePriceList(id, priceList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePriceList(@PathVariable Long id) {
        return priceListService.deletePriceList(id);
    }
}

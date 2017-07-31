package guia;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping(value="/")
public class SerieController {

	private SerieRepository serieRepository;


	@Autowired
	public SerieController(SerieRepository serieRepository) {
		this.serieRepository = serieRepository;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public void postSerie(@RequestBody Serie serie) {
		if (userHaveSerie(serie)) {
			return;			
		} else {
			serieRepository.save(serie);
		}
	}
	
	@RequestMapping(value = "/remove/{idUsuario}", method = RequestMethod.POST)
	public void removeSerie(@RequestBody String imdbID, @PathVariable Long idUsuario) {
		List<Serie> series = serieRepository.findByidUser(idUsuario);
		for (Serie serie2 : series) {
			if (serie2.getImdbID().equals(imdbID)) {
				serieRepository.delete(serie2);	
				System.out.println("aqui");
			} else {

				throw new RuntimeException();
			}
		}
	
	}
	
	@RequestMapping(value = "/saveWatchlist", method = RequestMethod.POST)
	public void postSerieWatchlist(@RequestBody Serie serie) {
		if (userHaveSerie(serie)) {
			return;			
		} else {
			serieRepository.save(serie);
		}
	}
	
	@RequestMapping(value = "/removeWatchlist/{idUsuario}", method = RequestMethod.POST)
	public void removeSerieWatchlist(@RequestBody String imdbID, @PathVariable Long idUsuario) {
		List<Serie> series = serieRepository.findByidUser(idUsuario);
		for (Serie serie2 : series) {
			if (serie2.getImdbID().equals(imdbID)) {
				serieRepository.delete(serie2);	
			} else {
				throw new RuntimeException();
			}
		}
	
	}
	
	public boolean userHaveSerie(Serie serie) {
		List<Serie> series = serieRepository.findAll();
		for (Serie serie2 : series) {
			if (serie2.equals(serie)) {
				return true;
			}
		} return false;
	}
	
	@RequestMapping(value = "/getSeriesWatchlist/{idUsuario}", method = RequestMethod.GET)
	public List<Serie> getSeriesWatchlist(@PathVariable Long idUsuario) {
		List<Serie> watchlist =  serieRepository.findByidUser(idUsuario);
		List<Serie> exibicao = new ArrayList<>();
		for (Serie serie : watchlist) {
			if (serie.isInWatchlist()) {
				exibicao.add(serie);
			}
		}
		return exibicao;
	} 
	
	@RequestMapping(value = "/getSeries/{idUsuario}", method = RequestMethod.GET)
	public List<Serie> getSeries(@PathVariable Long idUsuario) {
		List<Serie> profile =  serieRepository.findByidUser(idUsuario);
		List<Serie> exibicao = new ArrayList<>();
		for (Serie serie : profile) {
			if (!serie.isInWatchlist()) {
				exibicao.add(serie);
			}
		}
		return exibicao;
	} 
	
}

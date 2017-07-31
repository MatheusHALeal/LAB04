package guia;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Serie {
	
    @Id 
    @GeneratedValue(strategy=GenerationType.AUTO) 
    private Long id; 
    
    @Column(name="title", nullable=false)
    private String title;
    
    
    @Column(name="idUser", nullable=false)
    private Long idUser;
    
    @Column(name="imdbID", nullable=false)
    private String imdbID;
    
   @Column(name="inWatchlist", nullable=false)
   private boolean inWatchlist;
   
	public boolean isInWatchlist() {
	return inWatchlist;
}

public void setInWatchlist(boolean inWatchlist) {
	this.inWatchlist = inWatchlist;
}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdUser() {
		return idUser;
	}

	public void setIdUser(Long idUser) {
		this.idUser = idUser;
	}

	public String getImdbID() {
		return imdbID;
	}

	public void setImdbID(String imdbID) {
		this.imdbID = imdbID;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idUser == null) ? 0 : idUser.hashCode());
		result = prime * result + ((imdbID == null) ? 0 : imdbID.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Serie other = (Serie) obj;
		if (idUser == null) {
			if (other.idUser != null)
				return false;
		} else if (!idUser.equals(other.idUser))
			return false;
		if (imdbID == null) {
			if (other.imdbID != null)
				return false;
		} else if (!imdbID.equals(other.imdbID))
			return false;
		return true;
	}




    
	
    

}

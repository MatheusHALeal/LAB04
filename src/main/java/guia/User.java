package guia;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="users")
@Entity
public class User {
	
	
    @Id 
    @GeneratedValue(strategy=GenerationType.AUTO) 
    private Long id; 
    
    @Column(name="name", nullable=false)
    private String name;
    
    @Column(name="password", nullable=false)
    private String password;
    
    @Column(name="email", nullable=false)
    private String email;
    
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}

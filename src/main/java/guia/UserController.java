package guia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class UserController {

	private UserRepository userRepository;

	@Autowired
	public UserController(UserRepository usuarioRepository) {
		this.userRepository = usuarioRepository;
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public void register(@RequestBody User user) {
		if (userRepository.findByEmail(user.getEmail()) != null) {
			throw new RuntimeException();
		} else {
			userRepository.save(user);
			return;
		}
	}

	@RequestMapping(value = "/getin", method = RequestMethod.POST)
	public User login(@RequestBody User user) {
		if (validation(user.getEmail(), user.getPassword()) == null) {
			throw new RuntimeException();
		} else {
			return validation(user.getEmail(), user.getPassword());
		}

	}

	public User validation(String email, String password) {
		User user = userRepository.findByEmail(email);
		if (user != null) {
			if (user.getPassword().equals(password)) {
				return user;
			}
			return null;
		}
		return user;
	}
	
}

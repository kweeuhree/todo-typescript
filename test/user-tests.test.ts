import { describe, it, expect, vi } from 'vitest'; // Ensure 'vi' is imported from 'vitest'
import { fetchCSRFToken, userSignUp } from '../src/utils/fetchUser'; // Adjust path if needed
import { SignUpForm } from '../src/types/types';

// Mock fetchCSRFToken and userSignUp
vi.mock('../src/utils/fetchUser', () => ({
  fetchCSRFToken: vi.fn(),
  userSignUp: vi.fn()
}));

const mockFetchCSRFToken = fetchCSRFToken as vi.MockedFunction<typeof fetchCSRFToken>;
const mockUserSignUp = userSignUp as vi.MockedFunction<typeof userSignUp>;

// Sample signup details
const signupDetails: SignUpForm = {
  name: "Nok",
  email: "great@email.com",
  password: "great!pass!"
};

describe('userSignUp function', () => {
  it('signs the user up and returns user details', async () => {
    // Set up mocks
    mockFetchCSRFToken.mockResolvedValue('fake-csrf-token');
    mockUserSignUp.mockResolvedValue({ message: 'Sign up successful' });

    // Call the function under test
    const response = await userSignUp(signupDetails);

    // Assert expected outcomes
    expect(mockFetchCSRFToken).toHaveBeenCalled(); // Ensure the CSRF token was fetched
    expect(mockUserSignUp).toHaveBeenCalledWith(signupDetails); // Ensure userSignUp was called with correct details
    expect(response).toEqual({ message: 'Sign up successful' }); // Assert response
  });

  it('handles errors during sign up', async () => {
    // Set up mocks
    mockFetchCSRFToken.mockResolvedValue('fake-csrf-token');
    mockUserSignUp.mockRejectedValue(new Error("Failed user sign up"));

    // Call the function under test and expect it to throw an error
    await expect(userSignUp(signupDetails)).rejects.toThrow("Failed user sign up");
  });
});

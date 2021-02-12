export function loginMock(flow) {
  switch (flow) {
    case "success":
      return {
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2NvZGUiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiYWNjZXNzX2xldmVsIjoxLCJpYXQiOjE1MTYyMzkwMjJ9.Q6vveOborgZnSKlDxOFE04sBd7jy9dMl4Od-1CUNtCQ",
        "name": "Sponsorlytix",
        "user_code": "1",
        "access_level": "2",
        "status": "A"
      }
    
  
    default:
      return {
        "error_code": "3",
        "message": "User is not found"
      }
  }
}

export function loginRefresh(flow) {
  switch (flow) {
    case "success":
      return {
        "refresh_token": "Bearer strongiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2NvZGUiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiYWNjZXNzX2xldmVsIjoxLCJpYXQiOjE1MTYyMzkwMjJ9.Q6vveOborgZnSKlDxOFE04sBd7jy9dMl4Od-1CUNtCQ"
      }
  
    default:
      return {
        "error_code": "3",
        "message": "User is not found"
      }
  }
}